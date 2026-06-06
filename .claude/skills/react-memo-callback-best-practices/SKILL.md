---
name: react-memo-callback-best-practices
description: "Use when adding, reviewing, or removing useMemo/useCallback/React.memo in React code. Trigger on: 'should I useMemo this', 'memoize this callback', 'too many re-renders', 'optimize this hook', code review of hook-heavy components, or debugging render performance. Emphasizes: last-resort optimizations — prefer composition, state lifting, dependency management first. Do NOT trigger for: general state structure, lifting, or context design (use react-state-handling), or writing new components with no performance concern."
argument-hint: "Describe the performance issue or hook usage you want to review"
---

# useMemo & useCallback Best Practices

## Philosophy

**useCallback and useMemo must be a last resort.** Most performance issues are solved through:

- **Composition**: Lift state to avoid prop passing to many children
- **State management**: Separate frequently-changing state from static state
- **Dependency discipline**: Manage arrays/objects so they don't change unnecessarily
- **Code structure**: Make re-renders naturally cheap (small components, minimal render scope)

Only reach for these hooks after you've measured a real perf problem and verified the hook itself will solve it.

## Composition First: Lift Content (children-as-props)

The single most useful composition technique — it often **replaces** a `memo` entirely.

**Mechanism:** an element passed as `children` (or any element prop) is created in the _parent's_ render scope. When the receiving component re-renders because of its _own_ state, that `children` prop keeps the same referential identity. React reconciles it, sees an identical element, and bails out — the subtree does **not** re-render. No `memo`, `useMemo`, or `useCallback` required.

**Rule of thumb:** push frequently-changing state _down_ into a small leaf, and pass the expensive/static tree _in_ as `children`.

```tsx
// ❌ Volatile scroll state lives where the expensive content is rendered.
// Every scroll event re-renders TaskBoard AND the whole TaskList.
function TaskBoard({ tasks }: { tasks: Task[] }) {
  const scrollY = useScrollPosition();
  return (
    <div className={scrollY > 0 ? "board--scrolled" : "board"}>
      <TaskList tasks={tasks} /> {/* re-created on every scroll tick */}
    </div>
  );
}

// ✅ Push the volatile state into a small leaf; pass the expensive tree as children.
// ScrollShadowContainer re-renders on scroll, but `children` keeps its identity,
// so React skips re-rendering TaskList — no memo needed.
function ScrollShadowContainer({ children }: { children: ReactNode }) {
  const scrollY = useScrollPosition(); // window 'scroll' listener
  return (
    <div className={scrollY > 0 ? "board--scrolled" : "board"}>{children}</div>
  );
}

function TaskBoard({ tasks }: { tasks: Task[] }) {
  return (
    <ScrollShadowContainer>
      <TaskList tasks={tasks} />
    </ScrollShadowContainer>
  );
}
```

Try this (and state-lifting) **before** reaching for any of the hooks below.

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

## Before Using These Hooks: Two Gates

**Gate 1 — evidence (must ALL be YES):**

- [ ] Did I measure the perf problem? (DevTools Profiler → Ranked Chart)
- [ ] Did I identify which component is actually expensive — the parent itself, not just the children?

**Gate 2 — alternatives exhausted (must ALL be NO):**

- [ ] Can I lift state so fewer components re-render?
- [ ] Can I restructure JSX (composition/children) to reduce re-render scope?
- [ ] Can I stabilize deps that change too often?
- [ ] Can I move inline object/array props outside JSX?

Proceed only if Gate 1 is all YES and Gate 2 is all NO.

## Usage Patterns & Pitfalls

### useMemo Pattern

```typescript
// ❌ Unnecessary: simple derived state
const isEmpty = useMemo(() => items.length === 0, [items]);

// ✅ Legitimate: expensive filtering: search, filters, sort, calculations.
const filteredItems = useMemo(
  () =>
    items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.status === "all" || item.status === filters.status),
    ),
  [items, searchTerm, filters],
);

// ❌ Wrong deps: missing dependency
const result = useMemo(
  () => compute(externalVar),
  [
    /* forgot externalVar */
  ],
);

// ✅ Right deps: all external variables in scope included
const result = useMemo(
  () => compute(items, searchTerm, sortOrder),
  [items, searchTerm, sortOrder],
);
```

### useCallback Pattern

```typescript
// ❌ Unnecessary: single button, no memoized children
const handleClick = useCallback(() => setOpen(true), []);

// ✅ Legitimate: memoized child will skip re-render
const handleSort = useCallback((column: string) => setSortBy(column), []);
// Only stable if []:
// - sortBy setter is stable (it is)
// - column not destructured from props

// ❌ Wrong: empty deps but uses props
const handleChange = useCallback(
  (value) => onUpdate(value), // onUpdate from props!
  [], // ← will stale-close over old onUpdate
);

// ✅ Right: all deps declared
const handleChange = useCallback(
  (value) => onUpdate(value),
  [onUpdate], // ← if onUpdate changes, callback updates
);
```

## Common Pitfalls

### False empty deps

- **Problem:** Deps change but deps array is `[]`.
- **Fix:** Run ESLint `exhaustive-deps`, honor warnings.

### Unnecessary memo on child

- **Problem:** Parent re-renders, child memo'd but props always new.
- **Fix:** Memoize the props, not the child (lift object creation).

### Chained useCallbacks

- **Problem:** `useCallback(a)` has `b` in deps, then `b` is `useCallback(...)`.
- **Fix:** Stop chaining; stable deps come from props/state, not other callbacks.

## Measurement: How to Verify

1. **Chrome DevTools** → Performance tab → Record → Interact → Check flamechart
2. **React DevTools Profiler** → Highlight/rank → See actual component render times
3. **Ask:** Is the re-render > 16ms? Does it cause visual stutter? If no, optimize elsewhere.

## Output: When Reviewing Code

For each useMemo/useCallback/memo finding:

1. **Cite the line** and quote the hook usage
2. **Verdict:** `unnecessary` | `legitimate` | `wrong-deps` | `replace-with-composition`
3. **Alternative first:** name the non-hook fix considered (composition, state lifting, dep stabilization) and why it does/doesn't apply
4. **Corrected snippet** when verdict is not `legitimate`

Order findings: composition/state-lifting opportunities first, hook fixes second.
Before delivering, confirm every finding has a line citation and a named alternative.

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

## Hard Rules

- NEVER add useMemo/useCallback without measured evidence of a real perf problem
- ALWAYS propose a composition or state-lifting alternative before any hook fix
- NEVER silence or ignore ESLint `exhaustive-deps` warnings
- NEVER memoize simple derived state (e.g., `items.length === 0`)

## References

- [React: useMemo](https://react.dev/reference/react/useMemo) — Official React docs
- [React: useCallback](https://react.dev/reference/react/useCallback) — Official React docs
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — Common misuse patterns
