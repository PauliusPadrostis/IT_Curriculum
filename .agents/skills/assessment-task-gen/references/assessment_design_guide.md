# Assessment Design Guide

Condensed pedagogy knowledge base for assessment generation.

---

## 1. Backward Design (Wiggins & McTighe)

Design sequence: **Objectives → Evidence → Instruction.**
The assessment is designed second (after learning objectives are defined), and instruction is planned last to align with both.

| Step | Action | Assessment Skill Implication |
|------|--------|------------------------------|
| 1. Identify desired results | Extract objectives from L/I lesson plans | Coverage matrix (Step 1) |
| 2. Determine acceptable evidence | Choose question types and formats | Format proposal (Step 2) |
| 3. Plan learning experiences | Not this skill's job | Handled by lesson-plan-gen |

**Rule:** Never generate assessment items before building the full coverage matrix from lesson objectives.

---

## 2. Bloom's Taxonomy → Question Type Mapping

| Bloom's Level | Cognitive Demand | Effective Question Types |
|---------------|-----------------|------------------------|
| Remember | Recall facts, definitions, terms | MCQ, matching, fill-in-blank |
| Understand | Explain, paraphrase, summarize | Short answer ("paaiškinkite..."), compare/contrast |
| Apply | Use knowledge in new situations | Practical tasks, code completion, formula application |
| Analyze | Break down, identify patterns, debug | Scenario analysis, debugging, code tracing |
| Evaluate | Judge, justify, compare approaches | Code review, "which is better and why," justify choice |
| Create | Design, write, produce original work | Write program, design solution, create product |

**Rule:** Each item's Bloom's level must match its tagged competency level. Slenkstinis items test Remember/Understand. Aukštesnysis items test Analyze/Evaluate/Create.

---

## 3. Constructive Alignment (Biggs)

Learning objectives, teaching activities, and assessment tasks must align. Misalignment produces invalid assessments.

| Pitfall | Example | How to Detect |
|---------|---------|---------------|
| Testing what was not taught | Asking about networks in a safety assessment | Item not traceable to coverage matrix |
| Testing wrong skill | Reading comprehension instead of CS concept | Student could answer without domain knowledge |
| Format artifacts | MCQ where answer is obvious from option length | Unequal option structure reveals correct answer |
| Cognitive mismatch | Objective says "apply" but item tests recall | Bloom's level of item < Bloom's level of objective |

**Rule:** Every assessment item must trace to a specific objective in the coverage matrix AND test at the cognitive level that objective requires.

---

## 4. Validity Checklist

Run these 5 checks on every assessment before output:

| # | Check | Pass Criterion |
|---|-------|---------------|
| 1 | Objective traceability | Every item maps to a specific learning objective |
| 2 | Cognitive level match | Item tests the intended Bloom's level, not lower |
| 3 | Construct validity | Student cannot answer correctly without target knowledge |
| 4 | Clarity | Instructions are unambiguous; one reasonable interpretation |
| 5 | Reliability | Two teachers would grade the same response the same way |

---

## 5. Formative (P) vs Summative (A) Design

| Dimension | P Lessons (Formative) | A Lessons (Summative) |
|-----------|----------------------|----------------------|
| Purpose | Diagnose readiness, guide study | Measure achievement, assign grade |
| Coverage | Narrow, current instruction focus | Broad, full scope of L/I lessons |
| Bloom's range | Matches current instruction level | Spans multiple levels (I-IV) |
| Hints/scaffolding | May include self-assessment cues | No hints, no scaffolding |
| Item reuse | Models assessment format | Never reuses P items verbatim |
| Score use | Feedback only, not graded | Contributes to final grade |

**Critical rule:** Do not reuse P lesson items verbatim in A assessments. P and A may share format and question types, but specific content (scenarios, data, code) must differ.

---

## 6. Competency Levels (National Curriculum)

| Level | Name | Grade | Descriptor |
|-------|------|-------|------------|
| I | Slenkstinis | 4 (30-44%) | Recognizes basic concepts. Uses given tools with step-by-step guidance. Reproduces demonstrated procedures. |
| II | Patenkinamas | 5-6 (45-64%) | Explains concepts in own words. Performs standard tasks independently. Identifies errors in familiar contexts. |
| III | Pagrindinis | 7-8 (65-84%) | Applies knowledge in new situations. Justifies choices with reasoning. Solves problems requiring multiple steps. |
| IV | Aukštesnysis | 9-10 (85-100%) | Analyzes complex situations independently. Evaluates alternatives and selects optimal approach. Creates original solutions to non-standard problems. |

**Distribution rule:** ~20% slenkstinis, ~30% patenkinamas, ~30% pagrindinis, ~20% aukštesnysis.
