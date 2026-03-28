# Testmoz Import Format Reference

Specification for generating .xlsx files importable by Testmoz.

**Authoritative source:** `references/testmoz_import_template.xlsx` (official Testmoz template). Always open and study the template before generating. This document summarizes the template's structure.

---

## Column Layout

| Column | Question row | Answer row |
|--------|-------------|------------|
| A | Question text | Empty (wrong answer) or `*` (correct answer) |
| B | Points (number, or `~N` for partial credit) | Answer text |
| C | Options: `shuffle`, `long`, `short`, `norightshuffle` | Column C of matching: right-side match |
| D | Explanation (shown after answering) | |
| E | Teacher notes (not imported) | |

**Critical:** Answer text always goes in column B. Column A on answer rows is either empty (wrong) or contains only `*` (correct).

---

## Question Types

### 1. MCQ (Single Correct Answer)

```
Row 1: [Question text]  [points]  []  []
Row 2: []               [Wrong 1] []  []
Row 3: [*]              [Correct] []  [Explanation]
Row 4: []               [Wrong 2] []  []
Row 5: []               [Wrong 3] []  []
Row 6: (blank row)
```

### 2. MCQ (Multiple Correct, Partial Credit)

```
Row 1: [Question text]  [~N]      [shuffle]  [Explanation]
Row 2: []               [Wrong 1] []         []
Row 3: [*]              [Right 1] []         []
Row 4: [*]              [Right 2] []         []
Row 5: []               [Wrong 2] []         []
Row 6: (blank row)
```

### 3. Fill-in-Blank

```
Row 1: [Question text]  [points]  []  []
Row 2: [*]              [Accept1] []  []
Row 3: [*]              [Accept2] []  []
Row 4: [*]              [Accept3] []  []
Row 5: (blank row)
```

All accepted answer variants on separate rows with `*` in column A.

### 4. Matching (Partial Credit)

```
Row 1: [Question text]  [~N]     [shuffle, norightshuffle]  []
Row 2: []               [Left 1] [Right 1]                  []
Row 3: []               [Left 2] [Right 2]                  []
Row 4: []               [Left 3] [Right 3]                  []
Row 5: (blank row)
```

### 5. Essay (Graded Long Answer)

```
Row 1: [Question text]  [points]  [long]  []
Row 2: (blank row)
```

Graded manually by teacher in Testmoz.

### 6. Short Answer (Ungraded)

```
Row 1: [Question text]  []  [short]  []
Row 2: (blank row)
```

### 7. Text Block (Not a Question)

```
Row 1: [Instructions or section header]  []  []  []
Row 2: (blank row)
```

---

## Pool Structure

Pools enable question randomization. Testmoz selects one variant per pool per student.

```
Row N:   [POOL]              [1]      []  []
Row N+1: (blank row)
Row N+2: [Essay variant 1]   [points] [long]  []
Row N+3: (blank row)
Row N+4: [Essay variant 2]   [points] [long]  []
Row N+5: (blank row)
Row N+6: [Essay variant 3]   [points] [long]  []
Row N+7: (blank row)
Row N+8: [END]               []       []  []
```

**Critical:** Blank rows separate ALL variants within a pool, including essay variants. Without blank rows, Testmoz treats subsequent variants as answer options for the first variant.

### Pool with MCQ variants

Each MCQ variant includes its full question + answer rows. Blank rows separate variants within the pool:

```
[POOL]                       [1]      []  []
(blank row)
[MCQ question variant 1]    [points] []  []
[]                           [Wrong]  []  []
[*]                          [Right]  []  []
[]                           [Wrong]  []  []
(blank row)
[MCQ question variant 2]    [points] []  []
[]                           [Wrong]  []  []
[*]                          [Right]  []  []
[]                           [Wrong]  []  []
(blank row)
[MCQ question variant 3]    [points] []  []
[]                           [Wrong]  []  []
[*]                          [Right]  []  []
[]                           [Wrong]  []  []
(blank row)
[END]                        []       []  []
```

**Rules:**
- `POOL` in column A starts a pool. Column B is the **pick count** (how many questions Testmoz shows from this pool per student). Almost always `1`. This is NOT a pool ID or sequence number.
- `END` in column A closes the pool
- Blank rows separate variants within a pool
- All variants must have identical point values
- Testmoz randomly selects one variant per pool per student

---

## .xlsx Generation Notes

- Use openpyxl for generation
- No cell formatting required (Testmoz ignores formatting)
- Do NOT include a header row. Testmoz treats every row as data. Start with the first question immediately.
- UTF-8 encoding for Lithuanian characters
- File extension must be .xlsx (not .xls)
- **Always study `references/testmoz_import_template.xlsx` before generating** to verify column placement
