# Content & Pedagogical Coherence Checks (Dimension 2)

This is the judgment dimension. You are not a linter — you are an experienced curriculum reviewer. Read critically, think about the learner's experience, and flag anything a real teacher would catch.

## Per-Lesson Checks (run by subagents)

### Topic completeness
Read the lesson README's title, overview, and learning objectives. Then read the actual content files (Theory_Pack, Student_Task, etc.). Ask:
- Does the content actually cover the topic named in the title?
- Are there obvious subtopics missing? For example: a lesson titled "C++ ciklai" (loops) that only covers `for` but never mentions `while` or range-based `for`.
- Are learning objectives from the README reflected in the content? If the README says "explain how X prevents Y," does the Theory_Pack actually explain that causal relationship?
- Is the depth appropriate for the grade level? (Grade 9 = assume no prior experience. Grade 10 = basic skills known. Grade 11-12 = tool-specific.)

### Cross-document alignment
- Do learning objectives appear consistently across README, Teacher_Plan, and Student_Task? Not word-for-word — semantically equivalent.
- Does the Theory_Pack provide the knowledge students need to complete the Student_Task? If the task asks students to do X, the theory must teach X.
- Does the Teacher_Plan's lesson flow match what's in the student materials? If the plan says "students work on task sheet exercise 3," does exercise 3 exist?
- Do timing estimates in the Teacher_Plan add up to ≤37 min?

### Scope realism
- Can the target student realistically do what's being asked in the time given?
- Is any single lesson trying to cover too much? A 37-minute lesson should have 1-2 core concepts, not 5.
- Are instructions clear enough that a student could follow them without the teacher re-explaining everything?

### Internal logic
- Do examples contradict each other within the same lesson?
- Do analogies and explanations actually make sense?
- Are there instructions that reference something not included in the materials?

## Cross-Lesson Checks (run by coordinator using content summaries)

### Bloom progression
Each subagent reports the observed Bloom level. The coordinator checks:
- Do levels generally progress upward across L lessons? (Remember → Understand → Apply → Analyze)
- Are there unexplained drops (e.g., Apply in lesson 3, then Remember in lesson 4)?
- I lessons should be at Apply or above. P lessons at Apply or above. A lessons match their README's stated Bloom level.

### Sequencing logic
- Are foundational concepts introduced before concepts that depend on them?
- If lesson 5 uses a concept from lesson 2, was it actually covered in lesson 2?

### Difficulty scaffolding
- Does difficulty increase across the module, not decrease?
- If multiple lessons teach the same skill at different difficulty levels, the levels must progress upward.
- Flag any case where a harder variant is introduced before an easier one.

### Prerequisite coverage
Each subagent reports `prerequisites_assumed`. The coordinator checks:
- For each lesson N, are all its prerequisites covered by `concepts_introduced` in lessons 1..N-1?
- Flag any prerequisite that was never introduced.

### Assessment fairness
- The A lesson should only test concepts and skills that were taught in the L/I lessons within its scope.
- If the module has multiple A lessons, each A's scope = lessons since the previous A (or since module start).
- Flag any assessment item that tests something not covered in its scope.

### Practice-harder-than-assessment
- Compare the P lesson's Practice_Task against the corresponding A lesson's Assessment_Task.
- The practice should be cognitively harder — higher Bloom level, more complex scenarios, less scaffolding.
- If practice is easier than or equal to the assessment, flag it.

### Common sense
- Would you, as an experienced teacher, approve this module for classroom use?
- Does the sequence tell a coherent story? Does it build up to the assessment naturally?
- Flag anything that feels off, even if it doesn't match a named check above.
