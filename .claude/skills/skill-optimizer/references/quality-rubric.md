# Skill Quality Rubric — 9 Dimensions / 100 Points

Score any SKILL.md objectively. For each dimension: read the criteria, find specific evidence (cite line numbers), assign the score, note the gap. Do not estimate — if you can't find evidence for a higher score, assign the lower band.

---

## Dimension 1 — Trigger Precision (0–12)

Does the skill fire when it should and not when it shouldn't? Is the description discovery-ready?

| Score | Criteria |
|-------|----------|
| 10–12 | 3+ explicit trigger phrases, false-positive exclusions listed ("Do NOT trigger for: X"), bilingual coverage if skill serves bilingual users, slash command listed if one exists. Description is under 1,024 characters total (gets truncated at ~1,536 in skill listings — stay well under). |
| 7–9   | Triggers defined but missing exclusions, or only one language, or description is 1,024–1,400 chars (at risk of truncation). |
| 4–6   | Generic trigger: "when user asks about X" — no specific phrases, no exclusions. |
| 0–3   | Missing triggers, or description is a single vague sentence, or description exceeds 1,400 characters. |

**What to check:**
- Count the trigger phrases in the description. Are there 3 or more?
- Is there at least one explicit "Do NOT trigger" exclusion?
- Run `wc -c` on the description block — is it under 1,024 characters?
- If the skill is used by Spanish+English speakers, are phrases in both languages?
- Is the slash command (if any) named in the description?

---

## Dimension 2 — Procedure Clarity (0–14)

Are steps unambiguous and executable consistently by any model, including smaller ones?

| Score | Criteria |
|-------|----------|
| 12–14 | Every step has a concrete action verb, named inputs, and named outputs. Conditional branches have explicit conditions. Progress checkpoints present (e.g., "Proceed once all reads complete"). Instructions are explicit enough for Claude Haiku — no step relies on implicit reasoning or "figure it out" judgment. |
| 8–11  | Most steps clear; 1–2 use vague verbs without specifying expected output. Would work on Sonnet but may degrade on Haiku. |
| 4–7   | Several steps say "analyze X" or "review Y" without criteria. Result depends heavily on model capability. |
| 0–3   | Single prose block with no numbered steps, or so vague that two different model runs produce completely different outputs. |

**What to check:**
- Can you simulate executing this procedure step by step without guessing anything?
- Does any step rely on "use your judgment" without defining what good judgment looks like here?
- Are there progress checkpoints ("proceed once X completes") between phases?
- Would a Haiku-tier model follow this correctly, or does it require Opus-level inference?

---

## Dimension 3 — Parallel Execution (0–8)

Does the skill run independent work simultaneously?

| Score | Criteria |
|-------|----------|
| 7–8   | All independent reads happen in a single message. Sub-agents spawned in the same message when applicable. Explicit instruction: "In a single message, read simultaneously: A, B, C." |
| 5–6   | Most parallel opportunities used; one or two avoidable sequential reads remain. |
| 2–4   | Parallelism present but most reads are sequential. |
| 0–1   | Everything sequential — reads one file, waits, reads another, waits. No parallel patterns at all. |

**What to check:**
- Does Phase 1 read multiple files at once with an explicit "in a single message" instruction?
- If agents are spawned, are independent agents spawned in the same message?
- Are there file reads separated by steps that have no data dependency between them?

---

## Dimension 4 — Output Structure (0–12)

Is the output format fully specified and self-verifiable?

| Score | Criteria |
|-------|----------|
| 10–12 | Full markdown template with exact headings, table columns, severity labels, and fill-in placeholders. Includes a self-verification step ("before saving, confirm output contains: section A, section B, table with N columns"). How to deliver/save output is stated. |
| 7–9   | Template present but some sections left to interpretation. No self-verification step. |
| 4–6   | Output described in prose ("generate a report with findings"). No template. |
| 0–3   | Skill ends with "present your findings" or equivalent — no output specification whatsoever. |

**What to check:**
- Is there a markdown template (headers, tables, code blocks) for the output?
- Are severity/priority labels defined with criteria (not just named)?
- Is there a self-verification step where the model checks its own output before delivering?
- Is there a "save as" or "deliver as" instruction?

---

## Dimension 5 — Reference Quality (0–10)

Are references purposeful, flat, and actually loaded?

| Score | Criteria |
|-------|----------|
| 8–10  | Every reference file is explicitly loaded from a named step. References are flat (SKILL.md → references/*.md, no nesting). Each reference has a single, clear purpose. No orphan references. |
| 5–7   | References mostly used; one not clearly called from the procedure; or one level of nesting present. |
| 2–4   | References exist but the procedure doesn't consistently direct the model to load them. References do double duty (one file covers multiple unrelated purposes). |
| 0–1   | No references when large knowledge bases are needed, OR references exist but no step in the procedure ever loads them (dead files). |

**What to check:**
- For each file in `references/`, find the step in the procedure that loads it. If no step exists, it's an orphan.
- Are references flat? (SKILL.md loads them directly — they don't chain to sub-references)
- Does each reference file have exactly one purpose?
- Is information that belongs in a reference file currently bloating the SKILL.md body?

---

## Dimension 6 — Constraint Clarity (0–10)

Does the skill define hard boundaries using explicit, non-ambiguous language?

| Score | Criteria |
|-------|----------|
| 8–10  | Consolidated constraints section using MUST/NEVER/ALWAYS language. Covers: file modification limits, confirmation requirements, question-asking limits, and at least one "tempting-but-wrong" behavior the model might exhibit. |
| 5–7   | Constraints defined but not consolidated, or missing one important boundary, or written in soft language ("try to avoid X" instead of "NEVER do X"). |
| 2–4   | Some constraints scattered across the procedure but easy to miss. No consolidated section. |
| 0–1   | No constraints. Or only vague language like "be careful" with no specific prohibited behavior. |

**What to check:**
- Is there a dedicated "Constraints" section?
- Are constraints written as MUST/NEVER/ALWAYS (not "try to", "should", "prefer")?
- Is the file-write boundary explicit?
- Is the user-confirmation requirement explicit?
- Is there at least one constraint that blocks a behavior the model is likely to do wrong without guidance?

---

## Dimension 7 — Goal Alignment (0–14)

Does every step serve the skill's stated purpose with no padding?

| Score | Criteria |
|-------|----------|
| 12–14 | Every step produces something the user benefits from. No preamble restating the description. No transition commentary ("you are now ready to proceed"). No decorative sections. |
| 8–11  | 1–2 steps are partially redundant or add minor overhead. |
| 4–7   | Several steps are overhead: transition commentary, restating the description, internal bookkeeping shown to the user, decorative headers with nothing under them. |
| 0–3   | Significant bloat. Steps that exist to look comprehensive rather than to produce output. |

**What to check:**
- For each step: "If this step were removed, would the output change in a meaningful way?" If no → flag as bloat.
- Is there a preamble before Phase 1 that restates what the skill description already says?
- Are there any steps that only say "proceed to the next phase" with no other action?
- Are there headers with no content or only one sub-bullet?

---

## Dimension 8 — Cognitive Load (0–10)

Is the skill free of redundancy, duplication, and noise?

| Score | Criteria |
|-------|----------|
| 8–10  | No duplicate constraints. No redundant steps. No "as mentioned above" references. Structure is minimal and purposeful. Reading the skill once is enough — nothing needs re-reading to understand. |
| 5–7   | One duplicated constraint or one redundant step. Minor structural redundancy. |
| 2–4   | Same rule stated in 2–3 different places. Steps reference earlier steps unnecessarily ("as you did in Step 2..."). |
| 0–1   | Heavy noise. Rules repeated in header + procedure + constraints. Long "as mentioned" chains. Excessive caveats that say the same thing multiple ways. |

**What to check:**
- Is any constraint stated in more than one place?
- Is any step's content already covered by a previous step?
- Are there "note that..." or "remember that..." phrases that add no new information?
- Could two sections be merged without losing anything?

---

## Dimension 9 — Token Efficiency (0–10)

Is the skill lean enough to not waste context budget on every invocation?

| Score | Criteria |
|-------|----------|
| 8–10  | SKILL.md is under 400 lines. Large knowledge bases (API docs, extensive examples, long templates) are in reference files, not inline. Dynamic context injection (`!`command``) used where live data would otherwise require a manual step. |
| 5–7   | SKILL.md is 400–550 lines. Some large blocks could be moved to references. No dynamic context injection where it would help. |
| 2–4   | SKILL.md is 550–800 lines. Significant content that belongs in reference files is inline. |
| 0–1   | SKILL.md is 800+ lines, or contains entire API references, large data tables, or extensive code templates inline that should be in references/. |

**What to check:**
- Count lines in SKILL.md: `wc -l SKILL.md`
- Are there large code templates or tables that could be a reference file?
- Are there "live data" needs (current git diff, PR contents, file list, env vars) that could use `!`command`` injection instead of a manual read step?
- Does the skill load everything at once, or does it use progressive disclosure (load reference files only when needed)?

---

## Scoring Summary Template

```
| Dimension              | Max | Score | Evidence                              |
|------------------------|-----|-------|---------------------------------------|
| Trigger Precision      |  12 |    ?  | [line refs or specific finding]       |
| Procedure Clarity      |  14 |    ?  | [line refs or specific finding]       |
| Parallel Execution     |   8 |    ?  | [line refs or specific finding]       |
| Output Structure       |  12 |    ?  | [line refs or specific finding]       |
| Reference Quality      |  10 |    ?  | [line refs or specific finding]       |
| Constraint Clarity     |  10 |    ?  | [line refs or specific finding]       |
| Goal Alignment         |  14 |    ?  | [line refs or specific finding]       |
| Cognitive Load         |  10 |    ?  | [line refs or specific finding]       |
| Token Efficiency       |  10 |    ?  | [line count + specific finding]       |
| TOTAL                  | 100 |    ?  |                                       |
```

**Interpretation:**
- 88–100: Excellent. Polish-level changes only — do not manufacture improvements.
- 72–87: Good. Targeted improvements in 1–2 dimensions will make a real difference.
- 52–71: Needs work. Multiple dimensions have significant gaps.
- Below 52: Major rewrite. Start with Procedure Clarity and Output Structure.
