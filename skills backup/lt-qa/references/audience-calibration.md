# Audience Calibration — Grade-Level Language Rules

This reference defines language complexity constraints by audience. Applied
during both PRE-GEN (to guide generation) and POST-GEN (to flag violations).

---

## Grade 9 (14–15 metų)

**Principle:** Assume zero prior knowledge. Write as if explaining to someone
who has never used a computer independently.

| Dimension | Constraint |
|-----------|-----------|
| Sentence length | Max 15 words average. No sentence over 20 words. |
| Vocabulary | Basic everyday Lithuanian + introduced technical terms only. |
| Technical terms | Every new term gets a parenthetical explanation on first use. |
| Sentence structure | Simple and compound sentences only. No subordinate clause nesting. |
| Instructions | One action per step. "Paspauskite..." not "Paspauskite... ir tada..." |
| Tone | Warm, encouraging, patient. Formal "jūs" but not stiff. |
| Paragraphs | Max 3 sentences. Prefer 1-2. |
| Examples | Concrete and visual. "Pvz., raudonas mygtukas viršuje kairėje." |

**Banned for grade 9:**
- Subordinate clause chains (kad...kuris...nes...)
- Abstract nouns without concrete grounding
- Passive voice
- Nominalized verbs (e.g., "duomenų apdorojimas" → "kaip apdoroti duomenis")

---

## Grade 10 (15–16 metų)

**Principle:** Basic digital literacy assumed. Student knows files, folders,
keyboard shortcuts, basic navigation. Explain only new tools and concepts.

| Dimension | Constraint |
|-----------|-----------|
| Sentence length | Max 20 words average. No sentence over 25 words. |
| Vocabulary | Everyday + basic IT vocabulary without re-explaining. |
| Technical terms | New terms defined on first use. Known terms used freely. |
| Sentence structure | Compound and some complex sentences OK. Max 1 subordinate clause. |
| Instructions | Up to 2 related actions per step. |
| Tone | Clear, professional but approachable. |
| Paragraphs | Max 4 sentences. |
| Examples | Can be slightly more abstract. Real-world analogies welcome. |

---

## Grade 11 (16–17 metų)

**Principle:** PC navigation is known. Student has programming basics. Focus
explanations on new concepts and tools only.

| Dimension | Constraint |
|-----------|-----------|
| Sentence length | Max 25 words average. Occasional longer sentences OK if clear. |
| Vocabulary | Full IT vocabulary. General academic Lithuanian acceptable. |
| Technical terms | Define only genuinely new or advanced terms. |
| Sentence structure | Complex sentences fine. Max 2 subordinate clauses. |
| Instructions | Can group related actions. Assume student can infer simple steps. |
| Tone | Professional, peer-like. |
| Paragraphs | Max 5 sentences. |

---

## Grade 12 (17–18 metų)

**Principle:** Near-adult audience with 3 years of IT education. Language can
approach university-prep level but should remain accessible.

| Dimension | Constraint |
|-----------|-----------|
| Sentence length | No hard cap, but clarity always wins. Aim for <30 word average. |
| Vocabulary | Full range. Technical jargon expected and used without apology. |
| Technical terms | No definitions needed for curriculum-covered terms. |
| Sentence structure | Unrestricted, but avoid needless complexity. |
| Instructions | Can describe goals rather than step-by-step for routine tasks. |
| Tone | Professional, concise, adult. |
| Paragraphs | Reasonable length. No artificial constraints. |

---

## Teacher audience

**Principle:** Professional peer. Minimal reformatting needed. Focus QA on
grammar, terminology, and factual accuracy — not on simplification.

| Dimension | Constraint |
|-----------|-----------|
| Language complexity | Unrestricted. |
| Tone | Professional, collegial. |
| QA focus | Grammar, punctuation, terminology, factual accuracy. |
| Reformatting | Only if sentences are genuinely awkward or contain errors. |

---

## Detection Rules

The skill determines audience from context:
1. **Explicit grade in file path** — e.g., `09_grade/` → Grade 9
2. **Skill that triggered generation** — student-task-gen always targets students
3. **Lesson type** — Teacher_Plan → teacher audience; Student_Task → student audience
4. **User instruction** — if user specifies audience, that overrides all
5. **Default** — if truly ambiguous, assume Grade 10 student (safe middle ground)
