# Lesson Type Definitions

This file is the canonical reference for all lesson type codes used in folder names (`NNN_T - Description/`).

---

## L — Learning lesson

A learning lesson introduces students to new knowledge, concepts, processes, or skills that they have not yet been formally taught within the module. The main purpose is first exposure, explanation, guided understanding, and initial practice.

An L lesson does not have to be teacher-centred in a narrow sense. It may include direct instruction, modelling, questioning, short checks for understanding, guided practice, pair work, or short independent tasks. What makes it an L lesson is not the method, but the fact that the lesson's main goal is to teach something new.

The teacher role is strong and explicit: explain, model, demonstrate, clarify misconceptions, control the sequence. Students engage with new material, ask questions, test understanding, and complete early practice tasks.

**Expected outcome:** Initial understanding and sufficient confidence for later application — not mastery.

**Typical examples:**
- Introducing spreadsheet formulas
- Explaining HTML structure and common tags
- Teaching how `for` and `while` loops work
- Presenting safe and unsafe online behaviour

**Should not become:** A long lecture with no student processing · A pure work session on old knowledge · A disguised assessment

---

## I — Integration lesson

An integration lesson has students apply, connect, and strengthen knowledge or skills that were already introduced in previous L lessons. The main purpose is consolidation through use.

An I lesson is usually more student-centred than an L lesson. Students work individually, in pairs, or in groups on tasks that require meaningful use of what they have already learned. The teacher's role shifts from primary instructor to guide, coach, and feedback provider.

An I lesson may include brief clarification or micro-teaching when gaps appear, but it should not introduce major new content as its main aim. If a lesson depends on a new core concept being taught in full, it is an L lesson, not an I lesson.

**Expected outcome:** Stronger fluency, better transfer, and greater independence.

**Typical examples:**
- Building a small webpage after HTML basics were taught
- Completing a programming task using loops already learned
- Applying spreadsheet skills to a real dataset
- Creating a digital product by combining several previously taught skills

**Should not become:** A second theory lesson in disguise · Vague "work time" without a clear learning product · A pre-assessment rehearsal narrowly focused on likely test items

---

## P — Pre-assessment preparation lesson

A pre-assessment preparation lesson is held shortly before a formal assessment to confirm readiness, reduce uncertainty, and rehearse the kinds of thinking or task formats that students are expected to handle.

The purpose is not to reteach the topic from scratch. It is to review, diagnose remaining misunderstandings, practise representative tasks, and make expectations explicit. A P lesson typically includes sample questions, worked examples, short timed practice, class discussion of common errors, and targeted revision.

**Expected outcome:** Assessment readiness — not deep new learning.

**Typical examples:**
- Reviewing likely spreadsheet task types before a practical test
- Practising short theory questions before a quiz
- Going through common coding mistakes before a programming assessment
- Completing one representative mixed-task practice set before the graded assessment

**Should not become:** Full reteaching of the whole module · A hidden graded assessment · A generic integration lesson without clear assessment alignment

---

## A — Assessment lesson

An assessment lesson is a formal, graded lesson in which students demonstrate what they have learned in relation to the module's objectives. It results in recorded evidence used for evaluation.

The purpose is judgement of attainment, not practice. The task may be a quiz, practical task, written response, project milestone, performance task, or mixed-format assessment. What defines it is that the lesson produces formal assessment evidence and contributes to a grade.

An A lesson should align clearly with the learning objectives and with the skill level students were prepared for in L, I, and P lessons. Criteria should be explicit and conditions predictable.

**Expected outcome:** Valid evidence of learning.

**Typical examples:**
- A quiz on digital safety concepts
- A practical spreadsheet task completed individually
- A short programming assessment requiring code writing and debugging
- A graded product submission with rubric-based evaluation

**Should not become:** A surprise with a changed format · A loose work session with unclear marking criteria · A lesson overloaded with unrelated objectives

---

## D — Exam drill lesson

An exam drill lesson (Grade 11–12) focuses specifically on exam-style performance rather than broad topic teaching. Its purpose is to improve speed, accuracy, familiarity with exam demands, and strategic handling of common exam tasks.

A D lesson is narrower and more exam-oriented than a normal I or P lesson. Students practise under constraints that resemble the real exam, but the lesson does not reproduce the full exam exactly. It focuses on exam patterns, question handling, timing, command words, common traps, and efficient method selection.

The teacher role is diagnostic and strategic: identify weak exam habits, teach exam-specific technique, and target the kinds of mistakes that cost marks even when knowledge is present.

**Expected outcome:** Improved exam performance — not just improved topic understanding.

**Typical examples:**
- Timed short-answer exam item practice
- Practising how to interpret exam task wording
- Completing one section of an exam under time pressure
- Analysing common mark-losing errors in previous exam responses

**Should not become:** A full mock exam · A normal theory lesson · A generic revision lesson with no exam-specific focus

---

## M — Mock exam lesson or sequence

A mock exam lesson (Grade 12) is an exam simulation based on authentic past-paper or equivalent material designed to reproduce the real exam as closely as is practical.

An M lesson differs from a D lesson because the priority is simulation, not targeted drilling. It mirrors the structure, timing, cognitive load, and task style of the real exam. Since full simulations may take more than one lesson, M should be treated as a sequence type when necessary.

**Expected outcome:** High-quality diagnostic evidence about exam readiness — revealing not only content gaps, but also pacing problems, endurance issues, careless errors, and weaknesses in exam strategy.

**Typical examples:**
- Completing a full previous-year exam paper
- Completing a half paper in one lesson and the remainder in the next
- Sitting a full practical mock under timed conditions
- A realistic exam simulation followed by later debrief

**Should not become:** A casual worksheet using old questions without authentic conditions · A drill lesson with constant teacher interruption · A graded topic test disguised as an exam simulation

---

## G — Gap repair / consultation lesson

A gap repair or consultation lesson is used after a mock exam or another major diagnostic event to address identified weaknesses. Its purpose is targeted improvement, not broad revision.

A G lesson should be based on evidence. Students should not all do the same thing unless they share the same gap. This lesson type works best when learners are grouped by need, given focused tasks, or supported through short consultations, reteaching bursts, guided practice, and corrective feedback.

The teacher role is highly diagnostic and adaptive: identify whether gaps are conceptual, procedural, strategic, or motivational, and provide the right support for each.

**Expected outcome:** Specific weaknesses reduced or made actionable — not whole-topic re-coverage.

**Typical examples:**
- Reteaching one weak spreadsheet skill to a small group after a mock
- Running short consultations on common programming errors
- Giving different students different recovery tasks based on mock analysis
- Helping students understand why they lost marks and how to fix that pattern

**Should not become:** A vague "catch-up" lesson with no diagnostic basis · A repetition of the entire module for everyone · An unstructured help session without defined targets

> **In the repo:** G lessons occupy the final 9 lessons of Grade 12 `04_Exam_Prep` (sequences 127–135): three error pattern clinics (G1–G3), three individualized weak-skill stations (G4–G6), and three retest loops with the no-repeat error rule (G7–G9).

---

## Embedded formative checks

Formative checks are **not a standalone lesson type**. They are embedded assessment moments that can appear inside L, I, P, D, or G lessons.

Their purpose is retrieval, checking understanding, surfacing misconceptions, and guiding immediate teaching decisions. They are short, low-stakes, and not formally graded (though the teacher may record observations).

**Typical examples:**
- A 5–10 minute recall quiz
- Cold-call verbal questioning
- Mini whiteboard responses
- A short exit ticket
- A quick coding checkpoint
- A short self-check or peer-check task

**Classification rule:** The lesson type remains L, I, P, D, or G. The formative check is recorded as an embedded `## 📌 Embedded Formative Check` section inside the host lesson's README — not as a separate folder.

---

## T — Timed pre-mock lesson

A timed pre-mock lesson (Grade 12) has students complete a smaller, deliberately limited exam-style task under strict time conditions. Its main purpose is to build pacing, stamina, task-selection judgement, and confidence before full mock exams.

A T lesson is more realistic and time-disciplined than a normal D lesson, but narrower in scope than a full M lesson. Students work under conditions designed to feel exam-like, yet the task covers only a section, skill cluster, or shortened paper.

The defining feature is not just that the task is timed, but that **timing is central to the learning goal**. Students experience exam pressure in manageable portions so they can improve pacing before attempting full past papers.

The teacher role is partly supervisory and partly diagnostic. During the timed phase, intervention should be minimal. Afterward, the teacher analyses how students used their time, where they slowed down, what they skipped, and whether difficulty came from knowledge gaps, weak strategy, or poor time management.

**Expected outcome:** Better control of pace and improved comfort with working accurately under time pressure.

**Typical examples:**
- Completing one exam section in the exact time allowance
- Doing a shortened timed practical task based on exam format
- Answering a limited set of past-paper questions under strict timing
- Practising how much can realistically be completed in 20–30 minutes

**Should not become:** A normal drill lesson with an arbitrary timer added · A full mock exam · A broad revision lesson without authentic time pressure · A lesson focused mainly on reteaching content

> **In the repo:** T lessons occupy sequences 104–115 in Grade 12 `04_Exam_Prep`, covering timed section runs (data, programming, mixed) before the mock exam sequence begins.
