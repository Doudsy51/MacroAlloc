#!/usr/bin/env node
/*
 * content_log.js — deterministic reader/writer for the track-content-selections registry.
 *
 * Purpose
 *   Append confirmed TOPIC_SELECTED entries to data/content-log/selected-topics.csv
 *   (the source of truth), regenerate data/content-log/selected-topics.xlsx from it,
 *   and answer content-memory queries used to build RECENT_CONTENT_LIBRARY for
 *   discover-content-opportunities. See ../references/contracts.md for the full
 *   schema and ../references/workflow.md for LOG/QUERY mode behavior.
 *
 * Usage
 *   node content_log.js log   <entry.json>          # append one row, then re-export xlsx
 *   node content_log.js query <query.json>           # print a RECENT_CONTENT_LIBRARY JSON object
 *   node content_log.js export-xlsx                  # regenerate the .xlsx from the .csv only
 *
 * Safety
 *   - Append-only: log never edits or removes an existing row.
 *   - A LOG call with a missing/invalid required field writes nothing and exits non-zero.
 *   - No network access; touches only the registry CSV/XLSX under data/content-log/.
 *
 * Dependencies
 *   Requires the "exceljs" npm package (added to package.json). Install locally if
 *   missing: npm install exceljs
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..", "..");
const DATA_DIR = path.join(ROOT, "data", "content-log");
const CSV_PATH = path.join(DATA_DIR, "selected-topics.csv");
const XLSX_PATH = path.join(DATA_DIR, "selected-topics.xlsx");

const COLUMNS = [
  "run_id", "job_id", "region", "selection_date_utc", "opportunity_id",
  "topic", "content_type", "score", "event_date", "freshness_class",
  "keywords", "locked_angle", "run_mode", "status",
];
const REQUIRED_FIELDS = COLUMNS.filter((c) => c !== "locked_angle" && c !== "status");
const REGIONS = new Set(["US", "EUROPE", "ASIA"]);
const CONTENT_TYPES = new Set(["Macro Insights", "Market Analysis", "ETF Research", "Education"]);
const RUN_MODES = new Set(["real", "test"]);

// ---------------------------------------------------------------------------
// Minimal RFC-4180-ish CSV encode/decode, scoped to this fixed, known schema.
// ---------------------------------------------------------------------------

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csvEncodeRow(fields) {
  return fields.map(csvEscape).join(",");
}

function csvParseLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { cur += ch; }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur); cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function readRegistry() {
  if (!fs.existsSync(CSV_PATH)) return [];
  const raw = fs.readFileSync(CSV_PATH, "utf8").replace(/\r\n/g, "\n");
  const lines = raw.split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const header = csvParseLine(lines[0]);
  if (header.join(",") !== COLUMNS.join(",")) {
    throw new Error(`BLOCKED: registry header mismatch. Expected ${COLUMNS.join(",")}, found ${header.join(",")}`);
  }
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = csvParseLine(lines[i]);
    if (fields.length !== COLUMNS.length) {
      throw new Error(`BLOCKED: malformed row ${i + 1} (expected ${COLUMNS.length} columns, found ${fields.length})`);
    }
    const row = {};
    COLUMNS.forEach((col, idx) => { row[col] = fields[idx]; });
    rows.push(row);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// LOG mode
// ---------------------------------------------------------------------------

function validateEntry(entry) {
  for (const field of REQUIRED_FIELDS) {
    const value = entry[field];
    const empty = value === undefined || value === null || (Array.isArray(value) ? value.length === 0 : String(value).trim() === "");
    if (empty) return `missing required field: ${field}`;
  }
  if (!REGIONS.has(entry.region)) return `invalid region: ${entry.region}`;
  if (!CONTENT_TYPES.has(entry.content_type)) return `invalid content_type: ${entry.content_type}`;
  if (!RUN_MODES.has(entry.run_mode)) return `invalid run_mode: ${entry.run_mode}`;
  return null;
}

async function log(entryPath) {
  const entry = JSON.parse(fs.readFileSync(entryPath, "utf8"));
  const issue = validateEntry(entry);
  if (issue) {
    console.log(JSON.stringify({ status: "BLOCKED", row: null, issue }));
    process.exit(1);
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const isNewFile = !fs.existsSync(CSV_PATH);
  const keywords = Array.isArray(entry.keywords) ? entry.keywords.join(";") : String(entry.keywords);
  const row = [
    entry.run_id, entry.job_id, entry.region, entry.selection_date_utc, entry.opportunity_id,
    entry.topic, entry.content_type, entry.score, entry.event_date, entry.freshness_class,
    keywords, entry.locked_angle || "", entry.run_mode, "TOPIC_SELECTED",
  ];

  const chunk = (isNewFile ? csvEncodeRow(COLUMNS) + "\n" : "") + csvEncodeRow(row) + "\n";
  fs.appendFileSync(CSV_PATH, chunk, "utf8");

  // Read-back verification: never report LOGGED without confirming the row landed.
  const rows = readRegistry();
  const landed = rows.some((r) => r.run_id === String(entry.run_id) && r.job_id === String(entry.job_id) && r.opportunity_id === String(entry.opportunity_id));
  if (!landed) {
    console.log(JSON.stringify({ status: "BLOCKED", row: null, issue: "write did not verify on read-back" }));
    process.exit(1);
  }

  await exportXlsx();
  console.log(JSON.stringify({
    status: "LOGGED",
    row: { run_id: entry.run_id, job_id: entry.job_id, region: entry.region, opportunity_id: entry.opportunity_id },
    issue: null,
  }));
}

// ---------------------------------------------------------------------------
// QUERY mode
// ---------------------------------------------------------------------------

function query(queryPath) {
  const q = JSON.parse(fs.readFileSync(queryPath, "utf8"));
  if (!q.region || !REGIONS.has(q.region)) {
    console.log(JSON.stringify({ status: "BLOCKED", region: q.region || null, entries_found: 0, entries: [], issue: `invalid or missing region: ${q.region}` }));
    process.exit(1);
  }

  let rows;
  try {
    rows = readRegistry();
  } catch (err) {
    console.log(JSON.stringify({ status: "BLOCKED", region: q.region, entries_found: 0, entries: [], issue: String(err.message || err) }));
    process.exit(1);
  }

  const lookbackDays = Number.isFinite(q.lookback_days) ? q.lookback_days : 45;
  const includeTest = q.include_test === true;
  const now = new Date();
  const cutoff = new Date(now.getTime() - lookbackDays * 24 * 60 * 60 * 1000);

  let filtered = rows.filter((r) => r.region === q.region);
  if (!includeTest) filtered = filtered.filter((r) => r.run_mode === "real");
  filtered = filtered.filter((r) => {
    const d = new Date(r.selection_date_utc);
    return !Number.isNaN(d.getTime()) && d >= cutoff;
  });
  if (q.content_type) filtered = filtered.filter((r) => r.content_type === q.content_type);
  if (q.keyword) {
    const needle = String(q.keyword).toLowerCase();
    filtered = filtered.filter((r) => r.keywords.toLowerCase().includes(needle));
  }

  filtered.sort((a, b) => (a.selection_date_utc < b.selection_date_utc ? 1 : -1));

  const entries = filtered.map((r) => ({
    topic: r.topic,
    content_type: r.content_type,
    event_date: r.event_date,
    freshness_class: r.freshness_class,
    keywords: r.keywords ? r.keywords.split(";") : [],
    locked_angle: r.locked_angle || null,
    score: Number(r.score),
    selection_date_utc: r.selection_date_utc,
  }));

  console.log(JSON.stringify({
    status: "CONTENT_MEMORY_READY",
    region: q.region,
    entries_found: entries.length,
    entries,
    issue: null,
  }));
}

// ---------------------------------------------------------------------------
// Excel export
// ---------------------------------------------------------------------------

async function exportXlsx() {
  let ExcelJS;
  try {
    ExcelJS = require("exceljs");
  } catch (e) {
    console.error("Missing dependency 'exceljs'. Install it once in this environment with: npm install exceljs");
    process.exit(1);
  }
  const rows = readRegistry();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Selected Topics");
  sheet.columns = COLUMNS.map((col) => ({ header: col, key: col, width: col === "topic" ? 60 : col === "locked_angle" ? 50 : col === "keywords" ? 30 : 18 }));
  sheet.getRow(1).font = { bold: true };
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLUMNS.length } };
  for (const row of rows) {
    sheet.addRow({ ...row, keywords: row.keywords ? row.keywords.split(";").join(", ") : "" });
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  await workbook.xlsx.writeFile(XLSX_PATH);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const [, , mode, argPath] = process.argv;
  if (mode === "log") {
    if (!argPath) { console.error("Usage: node content_log.js log <entry.json>"); process.exit(1); }
    await log(argPath);
  } else if (mode === "query") {
    if (!argPath) { console.error("Usage: node content_log.js query <query.json>"); process.exit(1); }
    query(argPath);
  } else if (mode === "export-xlsx") {
    await exportXlsx();
    console.log(JSON.stringify({ status: "EXPORTED", path: XLSX_PATH }));
  } else {
    console.error("Usage: node content_log.js <log|query|export-xlsx> [file.json]");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(1);
});
