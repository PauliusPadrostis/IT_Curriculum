# Structural & Metadata Checks (Dimension 1)

These checks are run by the coordinator in Step 1, before subagents are dispatched. They are mechanical — no content reading required beyond READMEs.

## 1. Folder-to-README alignment
- List all lesson folders on disk within the module directory.
- Read the module README's lesson table.
- Flag: folders that exist on disk but are missing from the module README table.
- Flag: entries in the module README table that have no corresponding folder on disk.

## 2. File existence per lesson type
- For each lesson folder, extract the lesson type from the folder name (the letter after the number: L, I, P, A, etc.).
- Load the required file list from `references/file_requirements.md` for that type.
- List actual files in the lesson folder.
- Flag: any required file that is missing.
- Flag: any file that exists but is not in the required list ("orphaned file"). Exception: README.md is always expected and never orphaned.
- If the lesson type has no canonical file list (D, T, MOCK, G), skip file checks and flag: "No file checklist for type {X}."

## 3. Naming conventions
- Lesson folders must match pattern: `NNN_T - Title` where NNN is a zero-padded number and T is the type letter.
- Content files should use the exact names from file_requirements.md (e.g., Teacher_Plan.docx, not teacher_plan.docx or TeacherPlan.docx).
- Flag any deviation.

## 4. README status accuracy
- For each lesson README, find the "Reikalingi failai" (required files) table.
- Compare the "Būsena" column against actual file existence:
  - README says ✅ but file doesn't exist → Flag as Critical: "README claims file exists but it doesn't"
  - README says ❌ but file exists → Flag as Major: "README says file missing but it exists"
- Compare the lesson's overall status (Būsena field at top) against the Būsena chain rules:
  - All files ✅ AND all Patikrinta ✅ → should be ✅ Baigta
  - All files ✅ AND some Patikrinta ❌ → should be ✅ Failai sukurti
  - Some content files exist → should be 🚧 WIP
  - Only README.md → should be 📋 Šablonas
- Flag any mismatch.

## 5. Module README rollup
- Count lesson statuses from individual lesson READMEs.
- Compare against the module README's summary/rollup line.
- Flag if the rollup doesn't match reality.

## 6. Incomplete lesson detection
- If a lesson folder has only README.md (Šablonas) or is missing required files (WIP), flag it as a structural issue.
- These lessons are excluded from Step 2 subagent dispatch — note this in the finding: "Lesson {NNN} skipped for content audit (status: {status})."
