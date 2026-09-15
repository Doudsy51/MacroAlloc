#!/usr/bin/env node
/*
 * build_package.js — deterministic DOCX renderer for generate-article-package.
 *
 * Purpose
 *   Replace hand-written, per-run Node scripts with one reusable generator so that
 *   producing a region's Publication Package, Workflow Report, and (later) French
 *   Publication Package no longer requires rewriting near-identical docx-js code
 *   each time.
 *
 * Usage
 *   node build_package.js <config.json>
 *
 * Input
 *   A single JSON config file (see references/domain-rules.md "Package config
 *   schema" for the authoritative field list). At minimum it must contain:
 *     - output_dir: directory the files are written into
 *     - one or more of: "publication", "workflow_report", "french_publication"
 *   Each present top-level key produces exactly one DOCX file at
 *   <output_dir>/<filename computed per the file naming convention>.
 *
 * Safety
 *   - Never overwrites an existing file: if any target path already exists, the
 *     script aborts before writing anything (protects user/article artifacts per
 *     docs/artifact-policy.md).
 *   - Performs no network access, no deletion, and touches only the paths it is
 *     told to write to.
 *
 * Output
 *   Writes the requested DOCX file(s) and prints one JSON line per file to
 *   stdout: {"path": "...", "sha256": "...", "bytes": N}. The caller (the
 *   generate-article-package skill) is responsible for copying these into the
 *   package manifest and for the zip/XML integrity checks described in
 *   references/contracts.md Section 3.11.
 *
 * Dependencies
 *   Requires the "docx" npm package. Install locally if missing:
 *     npm install docx
 *   Does not require LibreOffice or pandoc. Visual PDF rendering for human QA
 *   remains a separate, optional step outside this script.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

let docx;
try {
  docx = require("docx");
} catch (e) {
  console.error(
    "Missing dependency 'docx'. Install it once in this environment with: npm install docx"
  );
  process.exit(1);
}
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
} = docx;

const PAGE_US_LETTER = { size: { width: 12240, height: 15840 } };
const INTERNAL_LABEL = "INTERNAL — NOT FOR PUBLICATION";
const FRENCH_DISCLOSURE_HEADING = "ADAPTATION FRANÇAISE AUTOMATIQUE";

// ---------------------------------------------------------------------------
// Low-level building blocks
// ---------------------------------------------------------------------------

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1 });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } });
}
function pPara(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: 160 } });
}
function pBold(text) {
  return new Paragraph({ children: [new TextRun({ text, bold: true })], spacing: { after: 160 } });
}
function pItalic(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, italics: true, ...opts })], spacing: { after: 160 } });
}
function bullet(text) {
  return new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 80 } });
}
function hr() {
  return new Paragraph({
    text: "",
    border: { bottom: { color: "999999", space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 200 },
  });
}
function table(rows, widths) {
  const headerRow = rows[0];
  const bodyRows = rows.slice(1);
  const totalWidth = 9000;
  const colWidths = widths || headerRow.map(() => Math.floor(totalWidth / headerRow.length));
  const headerCells = headerRow.map((t, i) => new TableCell({
    width: { size: colWidths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: "DCE6F1" },
    children: [new Paragraph({ children: [new TextRun({ text: String(t), bold: true })] })],
  }));
  const bodyTableRows = bodyRows.map((r) => new TableRow({
    children: r.map((t, i) => new TableCell({
      width: { size: colWidths[i], type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: String(t) })] })],
    })),
  }));
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [new TableRow({ children: headerCells }), ...bodyTableRows],
  });
}

// Generic block renderer used by the Workflow Report's free-form "sections".
// Supported block types: paragraph, bold, italic, bullets, table, hr, heading2.
function renderBlocks(blocks) {
  const out = [];
  for (const block of blocks || []) {
    switch (block.type) {
      case "heading2":
        out.push(h2(block.text));
        break;
      case "paragraph":
        out.push(pPara(block.text));
        break;
      case "bold":
        out.push(pBold(block.text));
        break;
      case "italic":
        out.push(pItalic(block.text));
        break;
      case "bullets":
        (block.items || []).forEach((t) => out.push(bullet(t)));
        break;
      case "table":
        out.push(table(block.rows, block.widths));
        break;
      case "hr":
        out.push(hr());
        break;
      default:
        throw new Error(`Unknown workflow_report block type: ${block.type}`);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Document assemblers
// ---------------------------------------------------------------------------

function buildPublicationDoc(cfg, pub) {
  const children = [];
  children.push(
    new Paragraph({ text: `MacroAlloc — ${pub.edition_label}`, alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
    new Paragraph({ text: cfg.date, alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
    h1(pub.h1),
    pItalic(pub.subtitle),
    hr()
  );
  children.push(pBold("Key takeaways"));
  (pub.key_takeaways || []).forEach((t) => children.push(bullet(t)));
  children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
  (pub.body_paragraphs || []).forEach((t) => children.push(pPara(t)));
  if (pub.analysis_heading) {
    children.push(h2(pub.analysis_heading));
    children.push(pPara(pub.analysis_text));
  }
  if (pub.watch_heading) {
    children.push(h2(pub.watch_heading));
    children.push(pPara(pub.watch_text));
  }
  children.push(hr());
  children.push(new Paragraph({
    children: [new TextRun({ text: pub.disclaimer, italics: true, size: 18 })],
    spacing: { after: 240 },
  }));
  children.push(h2(pub.sources_heading || "Sources"));
  (pub.sources || []).forEach((t) => children.push(pPara(t, { size: 20 })));
  if (pub.seo_table && pub.seo_table.length) {
    children.push(h2(pub.seo_heading || "SEO for publication"));
    children.push(table(pub.seo_table, pub.seo_table_widths));
  }
  return new Document({ sections: [{ properties: { page: PAGE_US_LETTER }, children }] });
}

function buildWorkflowReportDoc(cfg, wf) {
  const children = [];
  children.push(
    new Paragraph({ children: [new TextRun({ text: INTERNAL_LABEL, bold: true, color: "B00000" })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
    new Paragraph({ text: "MacroAlloc Content Factory — Workflow Report", alignment: AlignmentType.CENTER, heading: HeadingLevel.TITLE }),
    new Paragraph({ text: `Region: ${wf.region_label} — ${wf.edition_label} — ${cfg.date}`, alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
    hr()
  );
  for (const section of wf.sections || []) {
    if (section.heading) children.push(h2(section.heading));
    children.push(...renderBlocks(section.blocks));
  }
  return new Document({ sections: [{ properties: { page: PAGE_US_LETTER }, children }] });
}

function buildFrenchPublicationDoc(cfg, fr) {
  const children = [];
  children.push(
    new Paragraph({ children: [new TextRun({ text: FRENCH_DISCLOSURE_HEADING, bold: true, color: "B00000", size: 24 })], alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
    new Paragraph({ children: [new TextRun({ text: fr.disclosure_text, italics: true })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
    hr()
  );
  children.push(
    new Paragraph({ text: `MacroAlloc — ${fr.edition_label}`, alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
    new Paragraph({ text: cfg.date, alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
    h1(fr.h1),
    pItalic(fr.subtitle),
    hr()
  );
  children.push(pBold(fr.key_takeaways_heading || "Points clés"));
  (fr.key_takeaways || []).forEach((t) => children.push(bullet(t)));
  children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
  (fr.body_paragraphs || []).forEach((t) => children.push(pPara(t)));
  if (fr.analysis_heading) {
    children.push(h2(fr.analysis_heading));
    children.push(pPara(fr.analysis_text));
  }
  if (fr.watch_heading) {
    children.push(h2(fr.watch_heading));
    children.push(pPara(fr.watch_text));
  }
  children.push(hr());
  children.push(new Paragraph({
    children: [new TextRun({ text: fr.disclaimer, italics: true, size: 18 })],
    spacing: { after: 240 },
  }));
  children.push(h2(fr.sources_heading || "Sources"));
  (fr.sources || []).forEach((t) => children.push(pPara(t, { size: 20 })));
  return new Document({ sections: [{ properties: { page: PAGE_US_LETTER }, children }] });
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const configPath = process.argv[2];
  if (!configPath) {
    console.error("Usage: node build_package.js <config.json>");
    process.exit(1);
  }
  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (!cfg.output_dir) {
    console.error("Config must specify output_dir.");
    process.exit(1);
  }
  if (!fs.existsSync(cfg.output_dir)) {
    console.error(`output_dir does not exist: ${cfg.output_dir}`);
    process.exit(1);
  }

  const jobs = [];
  if (cfg.publication) {
    jobs.push({
      filename: cfg.publication.filename ||
        `MacroAlloc_${cfg.content_type}_${cfg.region}_${cfg.date}_${cfg.slug}_Publication_${cfg.article_version}.docx`,
      build: () => buildPublicationDoc(cfg, cfg.publication),
    });
  }
  if (cfg.workflow_report) {
    jobs.push({
      filename: cfg.workflow_report.filename ||
        `MacroAlloc_${cfg.content_type}_${cfg.region}_${cfg.date}_${cfg.slug}_Workflow-Report_${cfg.article_version}.docx`,
      build: () => buildWorkflowReportDoc(cfg, cfg.workflow_report),
    });
  }
  if (cfg.french_publication) {
    jobs.push({
      filename: cfg.french_publication.filename ||
        `MacroAlloc_${cfg.content_type}_${cfg.region}_${cfg.date}_${cfg.slug}_Publication-FR_${cfg.article_version}.docx`,
      build: () => buildFrenchPublicationDoc(cfg, cfg.french_publication),
    });
  }
  if (jobs.length === 0) {
    console.error("Config must contain at least one of: publication, workflow_report, french_publication.");
    process.exit(1);
  }

  // Refuse to overwrite any existing target before writing anything.
  const targets = jobs.map((j) => path.join(cfg.output_dir, j.filename));
  const existing = targets.filter((t) => fs.existsSync(t));
  if (existing.length) {
    console.error("Refusing to overwrite existing file(s):");
    existing.forEach((t) => console.error(`  ${t}`));
    process.exit(1);
  }

  for (let i = 0; i < jobs.length; i++) {
    const doc = jobs[i].build();
    const buf = await Packer.toBuffer(doc);
    const outPath = targets[i];
    fs.writeFileSync(outPath, buf);
    const sha256 = crypto.createHash("sha256").update(buf).digest("hex");
    console.log(JSON.stringify({ path: outPath, sha256, bytes: buf.length }));
  }
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(1);
});
