---
name: end-session
description: >
  End-of-session repo reconciliation for the IT Curriculum repo (PauliusPadrostis/IT_Curriculum).
  Use this skill when the teacher types /end-session, "end session", "baigiam", "užbaikime",
  "session done", or signals the work session is over. This skill scans the repo for changes,
  updates lesson and module READMEs, rewrites tasks/status.md as a rolling snapshot, and
  proposes decisions/lessons for confirmation. Never run this skill mid-session or automatically.
  Only on explicit teacher command.
---

# End-Session Repo Reconciler

Scans the IT Curriculum repo after a work session, reconciles all tracking metadata,
and prompts the teacher for manual confirmations. Runs 5 steps in strict order.

---

## Step 0: Read context files

Before doing anything, read these files to understand current state:

1. `tasks/status.md`
2. `tasks/decisions.md`
3. `tasks/lessons.md`
4. `.claude/skills/end-session/references/file_requirements.md` (canonical required files per lesson type)

---

## Step 1: Scan lesson folders — update lesson READMEs

For every lesson folder under `Grade_*/Semester_*/Module_*/NNN_T - */`:

### 1a. List actual files in the folder

Use `ls` or glob to get every file present (excluding README.md itself).

### 1b. Read the lesson README.md

Extract the `Reikalingi failai` table and the `Busena` field.

### 1c. Reconcile the file table

Compare actual files against the table:

- **File exists + row shows ❌** → flip Busena column to ✅
- **File exists + no row in table** → add a new row with ✅ and a reasonable Pastaba
- **Row shows ✅ + file missing** → flip back to ❌ (file was deleted)
- **Patikrinta column** → never touch. Only the teacher flips this.

The table format is:

```markdown
| Failas               | Busena | Patikrinta | Pastaba                          |
|----------------------|--------|------------|----------------------------------|
| Teacher_Plan.docx    | ✅     | ❌         | Privalomas                       |
| Theory_Pack.docx     | ✅     | ❌         |                                  |
| Student_Task.docx    | ❌     | ❌         | Dar nesugeneruotas               |
```

### 1d. Cross-check against canonical file requirements

Extract the lesson type from the folder name (the letter after `NNN_` — e.g., `004_L` → type L).
Look up the required files for that type in `file_requirements.md`.

- **Required file missing from disk** → ensure the file has a row in the table with Busena ❌.
  Add the row if it doesn't exist.
- **File on disk but NOT in canonical list** → keep it in the table (it's a bonus file), don't remove.
- **Type not in file_requirements.md (D, T, MOCK, G)** → skip this check, log:
  "No file checklist available for type {X}. Structural file checks skipped."

This step is the **source of truth** for completeness. The README table alone is not authoritative
because it may not have been updated when new required files were added to the canonical list.

### 1e. Recalculate lesson Busena

Apply this chain — the FIRST matching condition wins.
**Important:** "All required files present" means all files from `file_requirements.md` for this
lesson type exist on disk, not just that the README table has no ❌ rows.

| Condition | Busena |
|-----------|--------|
| All required files present on disk AND all `Patikrinta` = ✅ | ✅ Baigta |
| All required files present on disk AND some `Patikrinta` = ❌ | ✅ Failai sukurti |
| At least one content file exists (besides README) | 🚧 WIP |
| Only README.md exists | 📋 Sablonas |

### 1f. Write updated README

Replace the `Busena` field value and the `Reikalingi failai` table in the README.
Do NOT touch any other section of the README. Preserve all content exactly.

### 1g. Prompt for manual check (if applicable)

If a lesson just transitioned to **✅ Failai sukurti** (all files present, not yet checked):

> "Pamoka NNN_T turi visus failus. Ar norite patikrinti ir pažymeti kaip Baigta?"

List the files. Wait for teacher response:
- **Yes / Taip** → flip all `Patikrinta` to ✅, set Busena to ✅ Baigta
- **No / specific file** → leave as is, note which files teacher wants to revisit
- **Skip** → move on, don't ask again this session

---

## Step 2: Update module READMEs — add status rollup

For every module-level README (`Grade_*/Semester_*/Module_*/README.md`):

### 2a. Read the current module README

### 2b. Add or update a Busena column in the Lesson Index table

Target format:

```markdown
| # | Folder | Type | Busena |
|---|--------|------|--------|
| 001 | `001_L - Ergonomics & healthy computer use/` | 📖 Lesson | 🚧 WIP |
| 002 | `002_L - Privacy & account safety/` | 📖 Lesson | 📋 Sablonas |
```

Pull each lesson's Busena from its README (just updated in Step 1).

### 2c. Add or update a summary line

Place this immediately after the module title/metadata, before the table:

```markdown
**Modulio busena:** X/N ✅ Baigta, Y/N 🚧 WIP, Z/N 📋 Sablonas
```

Only show categories that have >0 count. Include ✅ Failai sukurti in the WIP-like count
but label it separately if any lessons are in that state:

```markdown
**Modulio busena:** 1/7 ✅ Baigta, 2/7 ✅ Failai sukurti (laukia patikros), 3/7 🚧 WIP, 1/7 📋 Sablonas
```

### 2d. Preserve everything else in the module README

Do not touch teacher notes, descriptions, or any other content.

---

## Step 3: Rewrite `tasks/status.md` — rolling snapshot

Replace the entire file. New structure:

```markdown
# IT Curriculum: Repo Status

Last updated: YYYY-MM-DD

## Current State

- **Grades in repo:** [list]
- **Modules:** N total (list with lesson counts)
- **Lesson folders:** N total
- **File completeness:** N/M required files exist (X%) — based on `file_requirements.md`, not README tables
- **Lessons Baigta:** N | Failai sukurti: N | WIP: N | Sablonas: N

## Active Gaps

[Bulleted list of what's missing, broken, or needs attention. Be specific:]
- Lesson 001: missing Visual_Aid.pdf
- Module 02: no lesson content generated yet (all Sablonas)
- etc.

## Changelog

| Date | Summary |
|------|---------|
| YYYY-MM-DD | [one-liner about this session] |
| YYYY-MM-DD | [previous session] |
| ... | ... |
```

### Changelog rules:
- Add this session's entry at the TOP of the table (newest first)
- Keep maximum 20 entries
- If >20, remove oldest entries from the bottom
- Each entry is ONE line, max ~80 characters. Focus on what changed, not process.

---

## Step 4: Propose decisions and lessons

### 4a. Decisions

Review what happened in the session. If any of these occurred, propose a decision:

- A format or structure was chosen (output type, file naming, etc.)
- A pedagogical approach was settled on
- A tool or workflow was adopted or rejected
- A skill was modified in a way that affects future behavior

Present each candidate:

> **Proposed decision:** [title]
> **What:** [1-2 sentences]
> **Why it matters for future sessions:** [1 sentence]
>
> Append to decisions.md? (yes/no)

Only append confirmed decisions. Use the existing format in decisions.md:

```markdown
## YYYY-MM-DD — [Title]

**Decision**: [what was decided]

**Context**: [why it came up]

**Rationale**: [why this choice]
```

### 4b. Lessons

If the teacher corrected anything during the session (content, language, structure,
pedagogy, workflow), propose a lesson:

> **Proposed lesson:** [title]
> **Problem:** [what went wrong]
> **Rule:** [what to do instead]
>
> Append to lessons.md? (yes/no)

Only append confirmed lessons. Use the existing format.

### 4c. If nothing to propose

Say so. Don't fabricate decisions or lessons to seem productive.

---

## Step 5: Clear `tasks/todo.md`

Wipe the file contents. Leave it empty (or with just a heading):

```markdown
# Session TODO

(cleared — no active session)
```

---

## Edge Cases

- **No changes detected in repo:** Still rewrite status.md (the snapshot might be stale).
  Still run Steps 4-5. Skip Steps 1-2 but note "No file changes detected" in changelog.

- **New lesson folder with no README:** Skip it. The lesson-readme-gen skill creates READMEs.
  This skill only updates existing ones.

- **README has no Reikalingi failai table:** Add one based on files found in the folder.
  Use the standard table format from Step 1c. Set all Patikrinta to ❌.

- **README has old table format (no Patikrinta column):** Add the Patikrinta column.
  Set all Patikrinta to ❌. Preserve existing Busena and Pastaba values.

- **Module README has no Lesson Index table:** Skip module rollup for that module.
  Don't create tables from scratch — that's the module README generator's job.

---

## What This Skill Does NOT Do

- Generate content (lesson plans, tasks, theory packs)
- Create new READMEs from scratch
- Create new folders or restructure the repo
- Push to git or create commits
- Edit any content sections of READMEs (objectives, overview, lesson flow, etc.)
- Modify Patikrinta flags without explicit teacher confirmation
