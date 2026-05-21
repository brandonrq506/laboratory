---
name: react-memo-callback-best-practices
description: 'Use when optimizing React hooks performance with useMemo and useCallback. Use for code review, writing optimized hooks, or debugging performance issues. Emphasizes: these are last-resort optimizations; prefer composition, state lifting, dependency management first.'
argument-hint: 'Describe the performance issue or hook usage you want to review'
---

# useMemo & useCallback Best Practices

## Philosophy

**useCallback and useMemo must be a last resort.** Most performance issues are solved through:
- **Composition**: Lift state to avoid prop passing to many children
- **State management**: Separate frequently-changing state from static state
- **Dependency discipline**: Manage arrays/objects so they don't change unnecessarily
- **Code structure**: Make re-renders naturally cheap (small components, minimal render scope)

Only reach for these hooks after you've measured a real perf problem and verified the hook itself will solve it.

## When to Use: Decision Tree

### useMemo

**Use when:**
1. **Expensive calculation** in render that truly blocks the UI (proof: Chrome DevTools profiler shows calc time > 5-10ms)
2. **Dependency array is stable** (deps only change when the actual computation should re-run)
3. **Inline object/array creation** passed as props causes excessive child re-renders (and you can't use composition)

**Most common legitimate case:** Complex filtered/transformed lists (e.g., filtering 1000 items by 3 criteria).

### useCallback

**Use when:**
1. **Callback passed to memoized child** (via React.memo) that needs to stay referentially equal
2. **Callback is a dependency** in another hook (useEffect, useCallback chain)
3. **You've measured** that the memo + callback combo actually prevents re-renders that mattered

**Honest use case:** Preventing a useEffect from re-running needlessly, or memoizing event handlers in sorted/virtualized lists.

## Before Using These Hooks: Checklist

- [ ] Did I actually measure the perf problem? (DevTools Profiler → Ranked Chart)
- [ ] Is the parent component heavy to re-render, or is it just the children?
- [ ] Can I lift state so fewer components re-render?
- [ ] Can I restructure JSX to reduce scope of re-renders?
- [ ] Do deps change too often? Can I stabilize them?
- [ ] Are object/array props created inline? Can I move them outside JSX?

If all answers are "no", then proceed.

## Usage Patterns & Pitfalls

### useMemo Pattern

```typescript
// ❌ Unnecessary: simple derived state
const isEmpty = useMemo(() => items.length === 0, [items]);

// ✅ Legitimate: expensive filtering
const filteredItems = useMemo(
  () => items.filter(matches criteria involving search, filters, sort),
  [items, searchTerm, filters, sortBy]
);

// ❌ Wrong deps: missing dependency
const result = useMemo(() => compute(externalVar), [/* forgot externalVar */]);

// ✅ Right deps: all external variables in scope included
const result = useMemo(
  () => compute(items, searchTerm, sortOrder),
  [items, searchTerm, sortOrder]
);
```

### useCallback Pattern

```typescript
// ❌ Unnecessary: single button, no memoized children
const handleClick = useCallback(() => setOpen(true), []);

// ✅ Legitimate: memoized child will skip re-render
const handleSort = useCallback(
  (column: string) => setSortBy(column),
  []
);
// Only stable if []:
// - sortBy setter is stable (it is)
// - column not destructured from props

// ❌ Wrong: empty deps but uses props
const handleChange = useCallback(
  (value) => onUpdate(value), // onUpdate from props!
  [] // ← will stale-close over old onUpdate
);

// ✅ Right: all deps declared
const handleChange = useCallback(
  (value) => onUpdate(value),
  [onUpdate] // ← if onUpdate changes, callback updates
);
```

## Common Pitfalls

| Issue | Problem | Fix |
|-------|---------|-----|
| **False empty deps** | Deps change but deps array is `[]` | Run ESLint `exhaustive-deps`, honor warnings |
| **Unnecessary memo on child** | Parent re-renders, child memo'd but props always new | Memoize the props, not the child (lift object creation) |
| **Chained useCallbacks** | `useCallback(a)` has `b` in deps, then `b` is `useCallback(...)` | Stop chaining; stable deps come from props/state, not other callbacks |
| **Premature optimization** | Added 3 hooks to save 0.5ms re-render | Measure first; most apps are fast enough with plain React |
| **Forgetting cleanup** | useMemo holding stale reference after unmount | Unlikely if deps are correct, but consider lifecycle |

## Measurement: How to Verify

1. **Chrome DevTools** → Performance tab → Record → Interact → Check flamechart
2. **React DevTools Profiler** → Highlight/rank → See actual component render times
3. **Ask:** Is the re-render > 16ms? Does it cause visual stutter? If no, optimize elsewhere.

## In Laboratory Context

Given the project's emphasis on composition and state management:

- **Prefer state lifting** over useMemo to share data across tasks/routines
- **Use composition** to keep child re-renders cheap (e.g., TaskCard shouldn't re-render if parent's sorting state changes)
- **Stabilize object/array props** at the declaration site (outside JSX) instead of relying on useMemo
- **Validate deps** with ESLint before shipping

Example from Laboratory:
```typescript
// ❌ Before: many children re-render due to new object
<TaskList
  filters={{ active: true, category: selectedCategory }}
  ...
/>

// ✅ After: filters object is stable
const activeFilters = useMemo(
  () => ({ active: true, category: selectedCategory }),
  [selectedCategory]
);
<TaskList filters={activeFilters} ... />

// ✅ Better: move outside JSX if static, or use composition
const filters = { active: true, category: selectedCategory };
<TaskList filters={filters} ... />
```

## References

- [React: useMemo](https://react.dev/reference/react/useMemo) — Official React docs
- [React: useCallback](https://react.dev/reference/react/useCallback) — Official React docs
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — Common misuse patterns
