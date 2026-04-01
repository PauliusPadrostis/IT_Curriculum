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

## Execution Model

When the teacher triggers /end-session, the orchestrating session MUST dispatch the
entire end-session process to a dedicated agent with a fresh context window.

The orchestrating session does NOT run Steps 0-5 itself. Instead:

1. Acknowledge the teacher's request: "Paleidziu end-session agenta su svariu kontekstu."
2. Dispatch an agent with this full SKILL.md as its prompt, plus:
   - The repo root path
   - The current date
   - A brief summary of what was done this session (for the changelog)
3. The agent runs Steps 0-5 autonomously and returns results
4. The orchestrator presents the agent's proposals (decisions, lessons) to the teacher
5. Teacher confirms/rejects each proposal
6. The orchestrator (or a second agent) applies confirmed changes

**Why:** End-session runs when context is most depleted. The skill has 5 steps requiring
careful attention (folder scanning, README updates, status rewrite, decision proposals,
skill propagation). An agent with one job and a fresh context window has no reason to
skip steps. This follows CLAUDE.md rule 5 (delegate multi-step pipelines to agents).

**Exception:** If the session was trivial (no file changes, no decisions), the
orchestrator may skip agent dispatch and just say "Nieko naujo sioje sesijoje."

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
| Student_Task.docx    | ❌     | ❌         | Dar nesugeneruota                |
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

### 4d. Check lt-mistakes.yaml section placement

If `_references/lt-mistakes.yaml` was modified during this session (new entries added),
check whether each new entry is in the correct section:

- **CRITICAL** (top) — patterns the LLM produces frequently. Read before every generation.
- **FULL LIBRARY** (bottom) — rarer patterns. Used in POST-GEN verification only.

For each new entry, ask the teacher:

> "Naujas lt-mistakes.yaml įrašas: [wrong → correct]. Ar tai CRITICAL (skaityti prieš
> kiekvieną generavimą) ar FULL LIBRARY (tik POST-GEN patikrai)?"

Move the entry to the correct section if needed. Skip this step if the yaml was not modified.

### 4e. Propagate confirmed entries to affected skills

**Important:** The end-session agent identifies what needs propagation and returns this
information to the orchestrating session. The orchestrating session then dispatches the
updater and verifier agents below. The end-session agent does NOT dispatch sub-agents itself.

After ALL decisions and lessons are confirmed and appended, check whether any of them
affect content generation skills. A decision/lesson affects a skill if it changes:

- What text the skill should or should not produce (terminology, formatting, register)
- How the skill structures its output (sections, file naming, quote style)
- What the skill should check or validate (QA rules, coherence checks)
- What inputs the skill should read

**Skip this step if:** no decisions or lessons were confirmed, OR all confirmed entries
are purely architectural (repo structure, workflow process) with no skill-level impact.

**Identify affected skills:** For each confirmed entry, list which of the 8 generation
skills (lesson-plan-gen, student-task-gen, theory-pack-gen, visual-aid-gen,
lesson-readme-gen, practice-task-gen, assessment-task-gen, answer-key-gen) plus
lt-qa and module-qa need updating. Also check their reference files.

**Dispatch Agent 1 (Updater):** Launch an agent with:
- The exact text of each confirmed decision/lesson
- The list of affected skill SKILL.md files and their reference files
- Instruction: for each affected skill, read it, find where the rule should be encoded
  (or where an old contradictory rule exists), and make the edit. If the rule is already
  present, skip that skill. Report every change made.

**Dispatch Agent 2 (Verifier):** After the updater finishes, launch a second agent with:
- The same rule text and affected skill list
- Instruction: for each affected skill, verify the new rule is present and no
  contradictory old rule remains. Check SKILL.md AND all files under references/.
  Report: (a) skills correctly updated, (b) skills still missing the rule,
  (c) reference files with contradictory content.

**Orchestrator action:** Review the verifier report. If any skills were missed,
fix them directly (small targeted edits). Do NOT re-dispatch agents for stragglers.

**If the updater or verifier fails:** Note the pending updates in status.md under
"Active Gaps" so the next session can pick them up:

```markdown
- **Pending skill update:** [rule summary] affects [skill list]. Not yet encoded.
```

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
