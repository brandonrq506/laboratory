---
name: react-state-handling
description: "Use when designing, reviewing, or refactoring React state. Triggers: choose state structure, lift/share state, preserve vs reset state, context usage, reducer+context scaling, avoid duplicated/contradictory state."
argument-hint: "Describe feature, current state shape, and pain point (duplication, stale state, prop drilling, reset bugs, complexity)"
---

# React State Handling

Use this skill anytime state is added/changed in components/hooks.
Goal: minimal state, right owner, predictable updates, easy scaling.

## When to Use

- New UI feature needs state.
- Existing state feels duplicated/contradictory.
- Siblings need same source of truth.
- State resets unexpectedly or does not reset when expected.
- Prop drilling grows noisy.
- Multiple state transitions become hard to reason about.

## Procedure

1. Define domain first

- List user actions/events.
- List data that must persist between renders.
- List values derivable from other values.

2. Choose state structure (single source of truth)

- Keep only essential state.
- Avoid contradictions between fields.
- Avoid redundant/derived state.
- Avoid duplicate state across branches.
- Flatten deeply nested state when possible.

3. Place state at right owner

- If only one component needs it: keep local.
- If multiple siblings need it: lift to closest common parent.
- If many distant consumers need same data: consider context.

4. Decide preserve vs reset behavior

- Preserve when identity is same logical entity.
- Reset when identity changes (use `key` intentionally).
- Verify conditional rendering does not accidentally remount critical state.

5. Decide propagation method

- Prefer props first for shallow trees.
- Use context when prop drilling is broad/deep and data is truly shared.
- Split contexts by concern to limit re-renders.

6. Scale transitions

- If updates are simple and isolated: `useState`.
- If many actions mutate same domain: move to `useReducer`.
- If reducer state is broadly shared: combine reducer + context.

7. Validate before shipping

- Confirm no derived state stored unnecessarily.
- Confirm one source of truth per domain concept.
- Confirm update paths are explicit and testable.
- Confirm reset/preserve behavior via interaction tests.
- Confirm context boundaries are minimal and intentional.

## Decision Rules (Quick)

- Need value from other state? Derive, do not store.
- Two components edit same concept? Lift state.
- Passing same props 3+ levels repeatedly? Evaluate context.
- 4+ related action types on one state object? Evaluate reducer.
- Bug is stale/incorrect after toggle/switch? Check identity and `key`.

## Completion Criteria

- State model documented in PR/notes (owner + shape + why).
- No contradictory or duplicated state left.
- Preserve/reset behavior is intentional and verified.
- Tests cover core transitions and shared-state flows.

## References

- https://react.dev/learn/choosing-the-state-structure
- https://react.dev/learn/sharing-state-between-components
- https://react.dev/learn/preserving-and-resetting-state
- https://react.dev/learn/passing-data-deeply-with-context
- https://react.dev/learn/scaling-up-with-reducer-and-context
