# Anti-Patterns Catalog — What NOT to Add

If any proposed optimization matches a pattern below, **reject it immediately**. A skill that does less but does it precisely is better than a skill that does more and does it inconsistently.

---

## AP-1 — Scope Creep Addition

**Pattern:** Adding steps that belong to a different skill, or expanding the skill to cover adjacent problems it was not designed for.

**Detection:**
- The new step produces output the skill's Goal Statement does not mention
- The step would logically belong in a different existing skill
- The step starts with "while you're at it" or "also check for"

**Example:** Optimizing a test-evaluator → adding a step that generates new tests based on the gaps found. The evaluator's goal is to find issues; generating tests is the generator's goal.

**Why it makes things worse:** The skill becomes a swiss army knife. Triggers become ambiguous. Output becomes unpredictable.

**Rule:** Keep the scope. If the new capability is genuinely needed, create a new skill.

---

## AP-2 — Defensive Branching

**Pattern:** Adding `if X then Y else Z` branches for scenarios that never occur in the skill's actual usage.

**Detection:**
- The condition covers an edge case that has never been reported as a problem
- Another system already handles this (the IDE, the framework, the API)
- You are adding it "just in case"

**Example:** Optimizing a skill that runs in Claude Code → adding "if the model has no internet access, fall back to X." Claude Code always has configured tools.

**Why it makes things worse:** Dead branches confuse future editors and waste tokens.

**Rule:** Only add branches that protect against a real, documented failure mode.

---

## AP-3 — Redundant Confirmation Gate

**Pattern:** Adding a confirmation question where one already exists, or adding one for a reversible action.

**Detection:**
- A Phase N already asks the user to confirm before proceeding
- The action being protected is easily undone (reading a file, producing a draft)
- The gate would fire before every single step

**Example:** Skill already asks "Shall I proceed?" before writing the report → adding "Are you ready for me to analyze the skill?" before the read phase.

**Why it makes things worse:** Confirmation fatigue — users click yes without reading. The gate protecting the irreversible action loses its weight.

**Rule:** Maximum 2 confirmation gates per skill. One before the first irreversible action. Optionally one before spawning expensive parallel agents.

---

## AP-4 — Reference Hoarding

**Pattern:** Creating reference files that the procedure never explicitly loads, or adding references that duplicate SKILL.md content.

**Detection:**
- A new `references/X.md` file exists but no step says "load `references/X.md`"
- The reference contains information already stated in SKILL.md body
- The reference is "for completeness" rather than "loaded by step N"

**Example:** Adding `references/overview.md` that explains what the skill does — already in the SKILL.md description.

**Why it makes things worse:** Dead references suggest the procedure is incomplete. The model never reads them.

**Rule:** Only create a reference file if you can point to the exact step that loads it.

---

## AP-5 — Disclaimer Padding

**Pattern:** Adding "Note: this skill does not do X" for X that was never expected.

**Detection:**
- Disclaimer addresses something completely outside the skill's domain
- No user has ever confused this skill with the disclaimed behavior
- More than one sentence for something that can be said in five words

**Example:** Adding to a test evaluator: "Note: this skill does not configure CI/CD, deploy to production, or manage billing." None of these were ever expected.

**Why it makes things worse:** Padding increases reading time without adding value.

**Rule:** Only add a disclaimer if there is documented confusion between this skill and another.

---

## AP-6 — Phantom Parallelism

**Pattern:** Marking steps as "run in parallel" when they have sequential dependencies.

**Detection:**
- Step B needs output from Step A to run
- The "parallel" label is aspirational, not real

**Example:**
```markdown
Run in parallel:
- Step A: Read the config file
- Step B: Based on the config file, determine which tests to run  ← depends on A
```

**Why it makes things worse:** The model attempts parallel execution, hits the dependency, and either fails or ignores the parallel instruction.

**Rule:** Only mark steps as parallel when they have zero data dependency on each other.

---

## AP-7 — Constraint Duplication

**Pattern:** The same rule stated in three different places in the skill.

**Detection:**
- A rule appears in the frontmatter description, in Phase 1, AND in the Constraints section
- Rules re-stated with slightly different wording across multiple phases

**Example:**
```
Description: "...never saves files without asking..."
Phase 1: "...do not write any files yet..."
Phase 3: "...ask before saving, as mentioned earlier..."
Constraints: "NEVER save files without user confirmation"
```

**Why it makes things worse:** Future editors update one and miss the others. Inconsistency creeps in.

**Rule:** Each rule stated exactly once, in the Constraints section. If a step needs to call it out, reference: "see Constraints."

---

## AP-8 — Output Inflation

**Pattern:** Making the output longer or more complex than the user needs.

**Detection:**
- Output template has 10+ sections for a simple analysis
- Sections marked "include only if relevant" but the template still lists all of them
- Output repeats information from the input

**Example:** A bug report skill outputting: Executive Summary + Full Incident Timeline + Stakeholder Impact Analysis + Post-Mortem Template + Executive Briefing + KPI Assessment — for a small app bug.

**Why it makes things worse:** Users stop reading. Important findings get buried. Longer output takes more tokens to generate.

**Rule:** Output exactly what the user needs for the most common case. Offer optional sections at the end.

---

## AP-9 — Over-Specification of Irrelevant Details

**Pattern:** Specifying exact format for things that don't need exact format.

**Detection:**
- Rule prescribes how to name internal variables never shown to the user
- Rule specifies comment formatting for code examples that aren't templates
- Rule defines an exact string format for something no downstream system parses

**Example:** "When writing internal notes, always use the format `[INTERNAL-NOTE-{STEP}-{SEQUENCE}]:`" — no user ever sees this.

**Why it makes things worse:** Compliance overhead for zero user benefit.

**Rule:** Only specify format for things consumed downstream: output templates, file names, report headings, API calls.

---

## AP-10 — Goal Drift via Addition

**Pattern:** Each addition seems small, but cumulatively the skill now does something meaningfully different.

**Detection:**
- After all additions, re-read the Goal Statement
- Does the optimized skill produce exactly that output?
- Would a user who triggered this skill for its original purpose get unexpected extra work done?

**Example:** Original goal: "Review test files for quality issues." After additions: the skill also rewrites tests, creates POM files, and runs the tests. Goal drifted from review to full test-suite management.

**Why it makes things worse:** The skill is no longer predictable. Users who wanted a read-only review get irreversible file changes.

**Rule:** After planning all optimizations, re-read the Goal Statement. If scope expanded, cut back.

---

## AP-11 — SKILL.md Over 500 Lines

**Pattern:** Adding content inline to SKILL.md when it should be in a reference file.

**Detection:**
- After optimization, `wc -l SKILL.md` exceeds 500 lines
- A block of 40+ lines appears in only one phase
- Large code templates, full API references, or long example tables are inline

**Why it makes things worse:** Every SKILL.md line loads on every invocation. At 800 lines, a single skill consumes a meaningful portion of the context window before Phase 1 even starts.

**Rule:** Keep SKILL.md under 400 lines. Move any block 40+ lines that only one phase uses to a reference file. Load it from that phase with `references/X.md`.

---

## AP-12 — Description Over 1,024 Characters

**Pattern:** Adding verbose explanation to the skill's `description:` frontmatter field.

**Detection:**
- `echo -n "description content" | wc -c` exceeds 1,024
- Description has 2+ paragraphs
- Description explains how the skill works internally

**Why it makes things worse:** Skill listings are truncated at ~1,536 characters. Descriptions near or over 1,024 chars risk being cut off — meaning Claude may not see the full trigger list or exclusions when deciding whether to load the skill.

**Rule:** Keep description under 900 characters. Remove internal implementation details; keep trigger phrases and exclusions only.

---

## AP-13 — Nested References

**Pattern:** Reference files that link to other reference files (chaining).

**Detection:**
- A reference file contains `Load references/X.md` or `See references/Y.md`
- Information requires following 2+ hops to reach

**Example:**
```
SKILL.md → references/guide.md → references/examples.md → references/data.md
```

**Why it makes things worse:** Claude may stop reading at the first level. Critical information in deep references is often never reached.

**Rule:** All references loaded from SKILL.md directly. No reference should point to another reference. Flat hierarchy only.

---

## AP-14 — Missing allowed-tools for MCP-Heavy Skills

**Pattern:** A skill that calls 5+ MCP tools or non-default tools has no `allowed-tools` in frontmatter.

**Detection:**
- The procedure uses `mcp__playwright__*`, `mcp__github__*`, or other MCP namespaces
- No `allowed-tools:` key in the YAML frontmatter

**Why it makes things worse:** Every MCP tool call triggers a user permission prompt. For a skill that calls 20 Playwright tools in sequence, this creates 20 interruptions that break the execution flow and defeat the skill's automation value.

**Rule:** Any skill using MCP tools or non-standard tool sets MUST declare `allowed-tools:` in frontmatter with the relevant namespaces pre-approved.

---

## AP-15 — Writing Only for Opus (Terse Instructions)

**Pattern:** Steps that rely on implicit reasoning — they work for Claude Opus but fail for Haiku or Sonnet.

**Detection:**
- A step says "analyze X" or "evaluate Y" without defining success criteria
- The procedure assumes the model knows what "good" looks like without being told
- Steps are terse to the point where following them requires significant inference

**Example:** "Check the test file for issues." — Opus infers what issues to look for; Haiku does not.

**Why it makes things worse:** Skills are used across all models. A skill that only works for Opus is not a production-quality skill. It also degrades when Anthropic updates Opus behavior.

**Rule:** Every evaluative step must name its criteria explicitly. Target Sonnet as the baseline model: if a Sonnet-tier model can follow the step without guessing, it passes.
