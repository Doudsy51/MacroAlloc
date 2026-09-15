# Politique de protection des artefacts

## Portée

Cette politique couvre les brouillons, dossiers de job, rapports de vérification, documents Word, manifestes, sorties d'accessibilité, scripts ponctuels et paquets ZIP présents dans `docs/article-jobs/`, `docs/article-packages/`, `test-packages/` ou ailleurs dans le dépôt.

## Principe de conservation

Tout fichier non suivi est présumé appartenir à l'utilisateur jusqu'à preuve contraire. Sa présence peut constituer la seule copie d'un travail éditorial ou d'une preuve de workflow.

Sans demande explicite, un agent ne doit pas :

- supprimer, nettoyer, déplacer ou renommer un artefact;
- l'écraser ou le régénérer au même chemin;
- le modifier pour le rendre conforme à une nouvelle convention;
- l'ajouter à Git, l'archiver ou l'inclure dans un commit;
- traiter un paquet de test comme une version approuvée ou publiée.

## Procédure avant modification

1. Exécuter `git status --short --untracked-files=all`.
2. Identifier les fichiers déjà modifiés et non suivis.
3. Définir une liste étroite de fichiers autorisés pour la tâche.
4. Utiliser de nouveaux noms versionnés lorsqu'une sortie doit être générée.
5. Comparer l'état final à l'inventaire initial.

Si un fichier utilisateur doit réellement être remplacé, demander une confirmation explicite en indiquant le chemin exact, l'effet et la possibilité de récupération.

## Publication et traçabilité

Un fichier généré n'est pas automatiquement approuvé. Les statuts métier proviennent du workflow et des portes humaines définies dans les skills, pas du nom du fichier, de son emplacement ou de sa qualité visuelle.

Les documents destinés à la publication doivent rester séparés des rapports internes. Les identifiants de job, diagnostics, preuves de workflow et notes de contrôle ne doivent pas fuiter dans le paquet public.
