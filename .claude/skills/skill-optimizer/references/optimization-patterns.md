# Optimization Patterns — Before/After Examples

Each pattern is a concrete transformation. Read the before, verify it matches what you see in the target skill, then apply the after version adapted to its content. Never copy-paste literally.

---

## Pattern 1 — Trigger Sharpening

**Applies to:** Dimension 1 < 9. Generic trigger or missing exclusions.

**Before (weak):**
```yaml
description: |
  Use this skill when the user wants to test things or check if the app works.
```

**After (sharp):**
```yaml
description: |
  Reviews Playwright E2E test files for quality. Trigger on: "review my tests",
  "audit playwright specs", "check test quality", "is this test well written",
  "code review my spec", or when the user pastes test code asking for feedback.
  Do NOT trigger for: "write tests", "generate tests", "create a playwright spec",
  "add e2e coverage" — those belong to the e2e-generator skill.
```

**Why:** Specific phrases give the model clear firing conditions. Exclusions prevent cross-skill interference. Keep under 1,024 chars total.

---

## Pattern 2 — Parallel Phase 1 Reads

**Applies to:** Dimension 3 < 6. Phase 1 reads files one at a time.

**Before (sequential):**
```markdown
## Phase 1
1. Read `package.json`
2. Read `playwright.config.ts`
3. Read the test file the user specified
4. Read `references/locators.md`
```

**After (parallel):**
```markdown
## Phase 1 — Read all inputs in parallel

In a single message, read simultaneously:
- `package.json` (tech stack)
- `playwright.config.ts` (if it exists)
- The test file the user specified
- `references/locators.md`

Proceed once all reads complete.
```

**Why:** Each read has no dependency on the others. Parallelizing them (single message, multiple Read tool calls) reduces wall-clock time proportionally to file count.

---

## Pattern 3 — Vague Step → Concrete Checklist

**Applies to:** Dimension 2 < 10. Steps use vague verbs without specifying what to look for.

**Before (vague):**
```markdown
## Step 2
Analyze the code for issues and write your findings.
```

**After (concrete + Haiku-safe):**
```markdown
## Step 2 — Evaluate against these 5 criteria

For each criterion, note the line number(s) where it applies:

1. **No hardcoded waits** — flag `waitForTimeout()` or numeric `sleep()` calls
2. **Selector strategy** — flag `.locator('.class')` selectors; prefer `getByRole()`, `getByLabel()`
3. **Test isolation** — flag module-level `let` mutated across tests without `beforeEach` reset
4. **Assertion specificity** — flag bare `.toBeVisible()` when content should be asserted
5. **Descriptive names** — flag names describing implementation, not user behavior

For each violation: cite exact line, quote the offending code, provide the corrected version.
```

**Why:** Criteria make execution consistent across models. A Haiku-tier model can follow a checklist; it cannot reliably "analyze for issues."

---

## Pattern 4 — Adding an Output Template with Self-Verification

**Applies to:** Dimension 4 < 9. Output is described but not templated, or no self-verification.

**Before (no template):**
```markdown
## Final Step
Present the results to the user with your findings and recommendations.
```

**After (template + self-check):**
```markdown
## Final Step — Output the Report

Use this exact structure:

```markdown
## [Skill Name] Optimization Report

### Score Summary

| Dimension         | Before | After | Delta |
|-------------------|--------|-------|-------|
| Trigger Precision | X/12   | Y/12  | +Z    |
| ...               |        |       |       |
| **TOTAL**         | **XX** | **YY**| **+ZZ** |

### Changes Applied
1. [what changed] → [concrete benefit]

### Preserved
- ✓ Goal: [one sentence]
- ✓ Output: [type of artifact]
```

**Before delivering, verify the report contains:**
- [ ] Score table with all 9 dimensions filled in
- [ ] At least one "Changes Applied" entry
- [ ] "Preserved" section with goal statement
```

**Why:** Self-verification catches missing sections before the user sees the output. The checklist is faster to scan than re-reading the entire output.

---

## Pattern 5 — Consolidating Scattered Constraints into MUST/NEVER/ALWAYS

**Applies to:** Dimension 6 < 7. Constraints buried in individual steps.

**Before (scattered, soft language):**
```markdown
Step 3: Try not to modify source files here
Step 5: Remember to ask before saving
Step 7: Prefer not to run more than one agent at a time
```

**After (consolidated, hard language):**
```markdown
## Constraints

- NEVER modify source code files — only create/edit files inside the skill's directory
- NEVER write a file without explicit user confirmation in a preceding message
- NEVER spawn more than one agent per phase
- ALWAYS ask all questions in a single message — never split into multiple rounds
- MUST apply the Goal Filter before proposing any change (see Phase 5)
```

**Why:** MUST/NEVER/ALWAYS language removes ambiguity. Consolidated section is harder to miss than constraints buried at the end of steps. Hard language outperforms soft language in directing model behavior.

---

## Pattern 6 — Removing Dead References

**Applies to:** Dimension 5 < 7. References exist but the procedure never explicitly loads them.

**Before (orphan reference):**
```markdown
## Phase 2
Analyze the codebase for patterns.
```
_(and `references/patterns.md` exists but is never mentioned in any step)_

**After (explicitly loaded):**
```markdown
## Phase 2 — Analyze patterns

Load `references/patterns.md`. Apply each pattern from that file as a named criterion. When flagging an issue, cite the pattern name from the reference: "Pattern: [name]".
```

**Why:** The model does not automatically read files in a `references/` folder. If the procedure does not explicitly direct it to load a reference, the reference is invisible.

---

## Pattern 7 — Removing Redundant Steps

**Applies to:** Dimensions 7 or 8 < 8. Steps that restate earlier steps.

**Before (redundant transition):**
```markdown
Step 1: Read the file
Step 2: Now that you have read the file and have context, use this context.
Step 3: With the context from Step 2, analyze for issues.
```

**After (pruned):**
```markdown
Step 1: Read the file
Step 2: Analyze for issues — [criteria]
```

**Why:** Step 2 in the before version adds zero information. Removing it does not change output. It does reduce token cost and cognitive load.

---

## Pattern 8 — Dynamic Context Injection

**Applies to:** Dimension 9 < 7 OR Dimension 3 < 6. Skill reads live data via a manual step that could be injected automatically.

Dynamic context injection uses `` !`command` `` syntax in SKILL.md. The command executes before Claude sees the skill, injecting real-time data directly into the instruction context.

**Before (manual step):**
```markdown
## Phase 1
1. Run `gh pr diff` to get the current PR diff
2. Run `git log --oneline -20` to see recent commits
3. Run `git status` to see current state
```

**After (injected):**
```yaml
---
name: pr-analyzer
description: Analyzes pull requests
---

## Live Context (auto-injected)
- PR diff: !`gh pr diff`
- Recent commits: !`git log --oneline -20`
- Current state: !`git status`

## Phase 1
The live context above is already loaded. Proceed directly to analysis.
```

**Why:** Injected context arrives before Phase 1 — no tool call needed, no sequential read step. The skill starts with the data it needs already in context. Use for: current git state, PR diffs, env vars, file lists, API health checks.

**When NOT to use:** If the data the skill needs depends on user input (e.g., which feature to test), injection won't work because you don't know what to inject until the user responds. Keep those as read steps.

---

## Pattern 9 — Validation Loop

**Applies to:** Dimension 4 < 8. Skill writes output but never verifies it meets requirements.

**Before (no verification):**
```markdown
## Step 5
Write the optimized SKILL.md.
```

**After (verify-fix-retry loop):**
```markdown
## Step 5 — Write and verify

1. Write the optimized SKILL.md using the Edit tool
2. Re-read the section you just edited (Read, lines X–Y)
3. Verify against checklist:
   - [ ] All confirmed changes are present
   - [ ] No content from the original was accidentally removed
   - [ ] Goal Statement is unchanged
   - [ ] All references previously called from the procedure are still called
4. If any checklist item fails: fix immediately and re-verify
5. Only proceed to Phase 8 when all items pass
```

**Why:** File writes can silently drop content (wrong line range, offset error, partial edit). A validation loop catches this before the user sees incorrect output. The "maximum 1 retry" constraint prevents infinite loops.

---

## Pattern 10 — Progress Checklist

**Applies to:** Dimension 2 < 10 for multi-phase skills. No progress tracking across phases.

**Before (no visibility):**
```markdown
## Phase 3
Analyze all the information you gathered and produce the report.
```

**After (with checklist):**
```markdown
## Phase 3 — Analyze

Before starting, confirm Phase 1 and 2 are complete:
- [ ] Phase 1: Skill file located and read
- [ ] Phase 2: Goal Statement written
- [ ] Phase 3: Starting now

Proceeding without completing the prior phases will produce incorrect scoring.
```

**Why:** Progress checklists make the execution state explicit. For skills that span multiple phases, they prevent the model from jumping ahead or skipping phases when context is long.

---

## Pattern 11 — Progressive Disclosure

**Applies to:** Dimension 9 < 7. Large content blocks inline in SKILL.md that could be reference files.

**Before (inline bloat — 300+ lines of templates):**
```markdown
## Output Template

[200 lines of detailed report template with every possible section, example data, etc.]
```

**After (reference file + pointer):**
```markdown
## Output Template

Load `references/report-template.md` and use the template defined there.
```

_(and `references/report-template.md` contains the 200-line template)_

**Why:** SKILL.md loads on every invocation. Reference files load only when the step that calls them runs. Moving large static content to references saves tokens on invocations where those sections aren't reached (e.g., user cancels before Phase 5).

**Threshold:** Move content to a reference file when it's 40+ lines and only needed in one phase.

---

## Pattern 12 — Description Length Trim

**Applies to:** Dimension 1 < 9. Description is over 1,024 characters.

**Symptoms:**
- Description has multiple paragraphs
- Lists 10+ trigger phrases
- Contains full explanation of how the skill works internally

**After (trimmed):**
Remove:
- Internal implementation details ("this skill works by first reading X, then scoring Y...")
- Trigger phrases that are redundant with shorter ones already listed
- Anything that can be derived from the skill name alone

Keep:
- The 3–5 most distinctive trigger phrases
- 1–2 key exclusions
- The one-sentence description of what the skill produces

**Target:** Under 900 characters for comfortable margin below the 1,024 limit.

---

## Pattern 13 — Flattening Nested References

**Applies to:** Dimension 5 < 7. Reference files link to other reference files.

**Before (nested chain):**
```
SKILL.md → references/advanced.md → references/examples.md → references/data.md
```

**After (flat):**
```
SKILL.md → references/advanced.md
         → references/examples.md
         → references/data.md
```

Update `SKILL.md` to load each reference directly from the relevant step.

**Why:** Claude may read nested files partially. A 3-hop chain means the model must explicitly load each level — and may stop at the first level. Flat references are always fully accessible from the main procedure.

---

## Pattern 14 — Adding allowed-tools Frontmatter

**Applies to:** Any skill that uses Playwright MCP, GitHub MCP, or any non-default tool set, AND doesn't have `allowed-tools` in frontmatter.

**Before (no frontmatter for tools):**
```yaml
---
name: exploratory-tester
description: ...
---
```

**After:**
```yaml
---
name: exploratory-tester
description: ...
allowed-tools:
  - mcp__playwright__*
  - Bash
  - Read
  - Write
  - Glob
  - Grep
---
```

**Why:** Without `allowed-tools`, every tool call requires a user permission prompt. For skills that call 20+ Playwright tools in a row, this creates constant interruptions that break the execution flow.

**When to add:** Any skill that uses MCP tools, or any skill where mid-run permission prompts would break continuity.
