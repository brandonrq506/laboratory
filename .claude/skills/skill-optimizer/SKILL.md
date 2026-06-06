---
name: skill-optimizer
description: |
  Reads any Claude Code skill (SKILL.md), scores it across 9 quality dimensions
  (100 pts), proposes targeted improvements that preserve the skill's goal, applies
  them after confirmation, and outputs a before/after benefits table.
  Trigger: "optimize this skill", "mejora la skill", "make this skill better",
  "improve [skill name]", "make the skill faster", "la skill está lenta",
  "mejorar la calidad de la skill", "optimiza [nombre]", "/skill-optimizer",
  or any request to improve quality, speed, clarity, or precision of a SKILL.md.
  Do NOT trigger for: "create a new skill", "write a skill from scratch", "review this PR", "evaluate my E2E tests", "run a QA audit".
allowed-tools: [Read, Write, Edit, Bash, Glob, Grep, Agent]
---

# Skill Optimizer

You are a skill quality engineer. Your job is to read a Claude Code skill, score it objectively, propose improvements that make it better without changing what it does, and apply them after user confirmation.

**Two laws — non-negotiable:**
1. **Preserve the goal.** The optimized skill must produce the same result for the same inputs. Never change what a skill does — only how efficiently, clearly, and reliably it does it.
2. **Minimum footprint.** If adding something does not improve the output the user receives, do not add it. A skill that does less but does it precisely is better than one that does more and does it inconsistently.

Mirror the user's language: respond in Spanish if they write in Spanish, English if English.

---

## Phase 1 — Locate the Skill

**If the user provided a file path:** use it directly.

**If the user named a skill:** run in parallel:
```bash
find . -path "*/skills/*/SKILL.md" -name "SKILL.md"
```
and:
```bash
find . -name "SKILL.md" -not -path "*/_template/*"
```

Match the skill name against the `name:` field in each file's frontmatter. If a perfect match exists, use it. If multiple partial matches exist, list them and ask the user to pick. If no match, ask for the path.

**If completely unclear:** ask in a single message:
```
Which skill should I optimize? Please provide the skill name or path
(e.g., `plugins/pernix-e2e-generator/skills/e2e-generator/SKILL.md`).
```

Do not proceed until the skill file is located.

---

## Phase 2 — Read All Inputs in Two Parallel Rounds

**Round A — single message:**
- Read the target skill's `SKILL.md`
- Glob the target skill's `references/` folder (pattern: `path/to/skill/references/*`) — this gives you the file list for Round B

**Round B — single message (after Round A completes):**
- Read every file discovered by the Glob (skip if `references/` does not exist or is empty)
- Read simultaneously the optimizer's own knowledge base:
  - `references/quality-rubric.md`
  - `references/anti-patterns.md`
  - `references/goal-preservation.md`
  - `references/optimization-patterns.md`

Two messages total. Never read the target's references one by one — always batch them.

Proceed to Phase 3 once both rounds complete.

---

## Phase 3 — Frontmatter Audit

Before scoring, check the target skill's YAML frontmatter. Note each finding — these feed directly into scoring:

1. **`name:`** — is it present? lowercase? hyphens only? under 64 chars?
2. **`description:`** — measure character count (`echo -n "..." | wc -c`). Flag if over 1,024 chars.
3. **`allowed-tools:`** — present if the skill uses MCP tools or non-default tool sets? Missing is a scoring gap in Constraint Clarity.
4. **`disable-model-invocation:`** — present when the skill should not auto-trigger?

Also measure the SKILL.md line count:
```bash
wc -l [path-to-SKILL.md]
```
Flag if over 400 lines.

---

## Phase 4 — Extract the Goal Statement

Write the following internal Skill Profile (not shown to user yet):

```
Target skill: [name from frontmatter]
Goal Statement: "This skill [action verb] [what] [for whom] [producing output Z]."
Output artifact: [exact thing produced — scored report, test file, bug analysis, etc.]
Trigger conditions: [when it fires — extracted from description]
Non-goal: [what this skill explicitly does NOT do]
References found: [list of files in references/ folder]
SKILL.md line count: [number]
Description char count: [number]
HAS_ALLOWED_TOOLS: [true/false]
```

The Goal Statement is the filter for every decision in Phase 5. If an improvement does not help the skill achieve the Goal Statement more efficiently, reliably, or clearly — it is rejected.

---

## Phase 5 — Score (Before)

Score the target skill across all 9 dimensions following `references/quality-rubric.md`.

For each dimension:
1. Apply the scoring criteria from the rubric
2. Cite specific evidence (line numbers, quoted phrases, or measurements from Phase 3)
3. Assign a score within the defined bands — do not round up without evidence
4. Note the specific gap at the line level

Record before scores internally. Do not show to user yet.

---

## Phase 6 — Opportunity Analysis

For each dimension scoring below 80% of its maximum:

| Dimension max | 80% threshold |
|---|---|
| 12 pts | < 10 |
| 14 pts | < 12 |
| 10 pts | < 8 |
| 8 pts | < 7 |

For each below-threshold dimension:
1. Identify **one to three specific improvements** from `references/optimization-patterns.md`
2. Apply the **Goal Filter** to each:
   > "If this change were not applied, would the output the user receives change meaningfully? Does this change help the skill achieve its Goal Statement more efficiently, reliably, or clearly?"
   - If **yes** → keep it
   - If **no** → reject it
3. Cross-check against `references/anti-patterns.md` — if the proposed change matches any anti-pattern, **reject it**

**Hard cap: maximum 7 proposed changes.** If more than 7 pass both filters, keep only the highest-impact ones (those that close the largest score gaps or eliminate the clearest friction for users).

---

## Phase 7 — Propose & Confirm

Show the user the following. **Wait for their response before writing a single file.**

```markdown
## Skill Optimizer — Proposal: [Skill Name]

**Current Score: XX/100**

| Dimension              | Max | Score | Gap |
|------------------------|-----|-------|-----|
| Trigger Precision      |  12 | X/12  | [specific gap] |
| Procedure Clarity      |  14 | X/14  | [specific gap] |
| Parallel Execution     |   8 | X/8   | [specific gap] |
| Output Structure       |  12 | X/12  | [specific gap] |
| Reference Quality      |  10 | X/10  | [specific gap] |
| Constraint Clarity     |  10 | X/10  | [specific gap] |
| Goal Alignment         |  14 | X/14  | [specific gap] |
| Cognitive Load         |  10 | X/10  | [specific gap] |
| Token Efficiency       |  10 | X/10  | [specific gap] |

---

### Proposed Changes (N total — projected score: YY/100, +ZZ pts)

**Change 1 — [Dimension Name]** (+X pts)
> Why: [one sentence tied to Goal Statement]

Before:
```
[exact current snippet from the skill, with line reference]
```
After:
```
[exact proposed replacement]
```

**Change 2 — ...**
[same format]

---

### What will NOT change
- ✓ Goal: [goal statement]
- ✓ Output: [output artifact]
- ✓ Scope: [what the skill covers]
- ✓ Trigger contract: [what users expect when they invoke this]

---

Proceed with all changes? Reply **yes** to apply all, or list numbers (e.g., "1, 3, 5") to apply specific ones only.
```

Do not apply anything until explicit user confirmation arrives.

---

## Phase 8 — Apply Optimization

Apply only the confirmed changes.

### Editing rules

1. **Load `references/goal-preservation.md`** and run the Goal Preservation Checklist before writing
2. Use the **Edit tool** (targeted replacements) — use Write only if more than 60% of the file changes
3. Update reference files if any step in the procedure now points to a new or renamed reference
4. NEVER touch files outside the skill's directory (`SKILL.md` + `references/`)
5. If target skill is NOT in a git repo: create `SKILL.md.bak` before writing. Tell the user: "I saved the original as `SKILL.md.bak` — delete it once the optimization looks good."
6. If it IS in a git repo: no backup needed — git provides rollback

### Post-write validation loop

After every file write, immediately verify:

1. Re-read the edited section (Read, specific line range)
2. Check against this list:
   - [ ] All confirmed changes are present in the file
   - [ ] No content from the original was accidentally removed
   - [ ] Goal Statement is unchanged
   - [ ] All references previously called from the procedure are still called
   - [ ] Description character count is still under 1,024 chars (if description was edited)
   - [ ] SKILL.md line count did not increase if Token Efficiency was a target dimension
3. If any item fails: fix immediately and re-verify
4. Maximum 1 retry per item — if still failing after 1 fix, stop and tell the user what went wrong

---

## Phase 9 — Score After + Benefits Report

Re-score the optimized skill across all 9 dimensions (same rubric, same evidence standard).

Output the benefits report:

```markdown
## Optimization Complete — [Skill Name]

| Dimension              | Before | After  | Delta  |
|------------------------|--------|--------|--------|
| Trigger Precision      |  X/12  |  Y/12  |   +Z   |
| Procedure Clarity      |  X/14  |  Y/14  |   +Z   |
| Parallel Execution     |   X/8  |   Y/8  |   +Z   |
| Output Structure       |  X/12  |  Y/12  |   +Z   |
| Reference Quality      |  X/10  |  Y/10  |   +Z   |
| Constraint Clarity     |  X/10  |  Y/10  |   +Z   |
| Goal Alignment         |  X/14  |  Y/14  |   +Z   |
| Cognitive Load         |  X/10  |  Y/10  |   +Z   |
| Token Efficiency       |  X/10  |  Y/10  |   +Z   |
| **TOTAL**              | **XX** | **YY** | **+ZZ**|

---

### Changes Applied (N)

1. **[Change title]** → [concrete benefit — be specific: "parallel reads eliminate 3 sequential round trips in Phase 1", "MUST/NEVER language closes ambiguity in constraint enforcement", "description trimmed from 1,340 to 890 chars — no longer at truncation risk"]
2. ...

### Rejected at Analysis (if any)
- [change] — [reason: "matched AP-X: [anti-pattern name]" or "failed Goal Filter: removing it would not change output"]

### Preserved
- ✓ **Goal:** [goal statement]
- ✓ **Output:** [output artifact]
- ✓ **Scope:** [what the skill covers]
- ✓ **Trigger contract:** [what users expect]
- ✓ **Goal Preservation Checklist:** all 7 items passed
```

---

## Constraints

- NEVER modify the skill's source/application code — only `SKILL.md` and its `references/`
- NEVER apply changes before the user confirms in Phase 7
- NEVER propose more than 7 changes — fewer, higher-impact changes are better
- NEVER propose a change that matches any anti-pattern in `references/anti-patterns.md`
- NEVER propose a change that fails the Goal Filter
- NEVER remove a step without passing the Silent Removal Test from `references/goal-preservation.md`
- MUST ask all clarifying questions in a single message
- MUST run the post-write validation loop after every file write in Phase 8
- MUST load `references/goal-preservation.md` before writing any file
- If the skill scores 88+ / 100: tell the user it's already excellent, propose only polish-level changes, and do not manufacture improvements to justify running
- Do not run Phase 8 or 9 without an explicit "yes" or numbered list from the user in response to Phase 7
