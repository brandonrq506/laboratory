# Goal Preservation — Verifying the Optimized Skill Still Does Its Job

The greatest risk in optimization is silent scope change: a step is removed or reworded, the skill stops doing something it used to do — and nobody notices until a user reports it. This guide defines how to verify that every optimization preserves the original purpose.

---

## Step 1 — Write the Pre-Optimization Goal Statement

Before touching a single line of the target skill, extract and write this statement:

```
Goal Statement:
"This skill [action verb] [what] [for whom] [producing output Z]."
```

The statement has 4 components:
1. **Action verb** — what the skill does (reviews, generates, analyzes, optimizes)
2. **What** — the subject matter (test files, charters, bugs, other skills)
3. **For whom** — who triggers it (developers, testers, QA engineers)
4. **Output Z** — the exact artifact produced (issue table, charter set, RCA report, optimized SKILL.md)

**Examples:**
- "This skill reviews Playwright test files for quality issues for developers, producing a structured issue table with line-level citations."
- "This skill generates exploratory testing charters for manual testers, producing a set of 5–8 structured charters organized by testing lens."
- "This skill analyzes bugs in source code for developers, producing a root cause analysis with 2–3 prioritized solution proposals."

Write this down before scoring. Use it in every phase as the filter for proposed changes.

---

## Step 2 — Verify the Description Still Matches After Optimization

After completing Phase 7 (applying changes), re-read the skill's `description:` frontmatter.

Ask: does the description still accurately describe what the optimized skill does?

If the optimization changed:
- **What the skill produces** → the description must be updated to match
- **The trigger conditions** → the description must reflect the new conditions
- **The scope** → the description must reflect the new scope

A description that no longer matches the procedure is a silent contract breach — the model will be told to expect X and get Y.

If the description needs updating: update it as part of Phase 7. Never leave a mismatch between description and procedure.

---

## Step 3 — The Output Equivalence Test

After drafting the optimized SKILL.md, simulate execution for 3 representative inputs:

**Input A:** The most common case — the "happy path" trigger
**Input B:** A slightly ambiguous case — triggers the skill indirectly
**Input C:** An edge case the skill explicitly handles (e.g., skill already at high score, no references found)

For each input:
1. Walk through the optimized procedure step by step
2. Identify the output artifact at the end
3. Compare to what the pre-optimization skill would have produced

**Pass:** For all 3 inputs, the output artifact matches the Goal Statement. Content may be better organized or more precise, but the type and scope are the same.

**Fail:** For any input, the output:
- Is a different type of artifact (scored report → rewritten code)
- Covers a different scope (single file → entire project)
- Omits something the Goal Statement promised (e.g., "2–3 solutions" becomes only 1)
- Adds something the Goal Statement did not promise (e.g., "review report" becomes "review + auto-applied fixes")

If any fail: revert the change that caused the mismatch.

---

## Step 4 — The Silent Removal Test

For every step or section **removed** during optimization, trace the removal:

1. What did this step produce? (A score? A section in the report? A file? A decision point?)
2. Is that output still produced by another step in the optimized version?
3. If not — was it actually needed? Apply the Goal Filter: "does the Goal Statement require this output?"

**If yes to #3:** The removal was invalid. Restore the step.
**If no to #3:** The removal is valid. The step was bloat.

Common false positives — steps that look necessary but are bloat:
- "Now that you've read the files, you have the context you need" → transition commentary
- "You are ready to proceed to Phase 3" → transition filler
- "As described in the introduction above, your goal is..." → restating description
- "The following tools will be used in this phase: Read, Write..." → planning narration

---

## Step 5 — The Scope Creep Test

After all optimizations are drafted, answer:

1. Does the optimized skill do anything the original skill did not do?
2. If yes: is the new action described in the Goal Statement?
3. If no: it is scope creep. Remove it.

Scope creep is most common when:
- Adding a "bonus" section to the output
- Adding a file write that wasn't in the original
- Adding external calls (GitHub issues, Slack notifications) not in the original

None of these are wrong on their own — but they change what the user receives when triggering the skill. That changes the trigger contract without updating the description.

---

## Step 6 — The Reversibility Check

Before writing the optimized skill:

1. Is the original in a git repo? → git provides rollback. No backup needed.
2. If NOT in a git repo → create `SKILL.md.bak` in the same directory before writing. Tell the user: "I saved the original as `SKILL.md.bak` — delete it once you confirm the optimization looks good."

Never overwrite without a rollback path.

---

## Goal Preservation Checklist

Check every item before finalizing the optimized skill:

- [ ] Goal Statement written before any changes were made
- [ ] Description updated if procedure scope changed
- [ ] Output Equivalence Test passed for 3 representative inputs (A: happy path, B: ambiguous trigger, C: edge case)
- [ ] Every removed step passed the Silent Removal Test
- [ ] No scope creep: optimized skill does not produce anything the Goal Statement does not promise
- [ ] Original SKILL.md is accessible for rollback (git history or `.bak` file)
- [ ] The "Preserved" section in the Benefits Report correctly states: goal, output type, output scope, trigger contract
