---
name: jest-dom-assertions
description: >-
  Use when writing or reviewing React component tests that assert on DOM state
  (Testing Library + @testing-library/jest-dom matchers). Trigger on: authoring
  a *.spec.tsx / *.test.tsx, "write a test for this component", "assert the
  button is disabled/checked/in the document", reviewing test assertions, or any
  expect(...) on a queried element. Enforces jest-dom matchers over raw
  DOM/attribute/property checks (toBeInTheDocument, toBeChecked, toHaveValue,
  toHaveAttribute, toHaveFocus, …). This is the in-house replacement for
  eslint-plugin-jest-dom. Do NOT trigger for: query selection strategy /
  getBy-vs-findBy / async waiting (that is testing-library plugin territory),
  non-DOM unit tests, hook tests with no rendered element, or test-runner config.
---

# jest-dom Assertions

`@testing-library/jest-dom` ships matchers that read intent directly off the
element. Prefer them over poking at attributes, properties, or the raw DOM — the
matcher gives a clearer failure message and survives DOM/ARIA details changing.

Matchers are auto-registered via `src/test/setup.ts`, so just use them. Tests run
on Vitest; `expect`/`screen` are global.

## The rule: assert through the element, not its internals

For every check below, the ❌ form works but reads poorly and gives a worse diff
on failure. Always write the ✅ form.

### Presence / absence

```ts
// ❌ length / null / defined / truthy checks on a query
expect(screen.queryByText("Save")).not.toBeNull();
expect(screen.queryAllByRole("row")).toHaveLength(1);
expect(screen.queryByText("Gone")).toBeNull();
// ✅
expect(screen.getByText("Save")).toBeInTheDocument();
expect(screen.queryByText("Gone")).not.toBeInTheDocument();
```

Use `queryBy*` (not `getBy*`) when asserting something is **absent** — `getBy*`
throws before the assertion runs.

### Checked / disabled / required

```ts
// ❌
expect(input).toHaveProperty("checked", true);
expect(input).toHaveAttribute("disabled");
expect(input).toHaveAttribute("required");
// ✅
expect(input).toBeChecked();
expect(input).toBeDisabled(); // toBeEnabled() for the negative
expect(input).toBeRequired();
```

### Value

```ts
// ❌
expect(input.value).toBe("hello");
expect(input).toHaveAttribute("value", "hello");
// ✅
expect(input).toHaveValue("hello");
```

### Focus

```ts
// ❌
expect(document.activeElement).toBe(input);
// ✅
expect(input).toHaveFocus();
```

### Attributes

```ts
// ❌
expect(link.getAttribute("href")).toBe("/home");
expect(el.hasAttribute("aria-hidden")).toBe(true);
// ✅
expect(link).toHaveAttribute("href", "/home");
expect(el).toHaveAttribute("aria-hidden");
```

### Class / style / text / empty

```ts
// ❌
expect(el.className).toBe("btn active");
expect(el.style.color).toBe("red");
expect(el.textContent).toBe("Total");
expect(el.innerHTML).toBe("");
// ✅
expect(el).toHaveClass("btn", "active");
expect(el).toHaveStyle({ color: "red" });
expect(el).toHaveTextContent("Total"); // accepts string or RegExp
expect(el).toBeEmptyDOMElement();
```

## Quick reference

| Instead of…                                                                       | Use                                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------- |
| `.toHaveLength(0/1)`, `.toBeNull()`, `.toBeDefined()`, `.toBeTruthy()` on a query | `toBeInTheDocument()` / `not.toBeInTheDocument()` |
| `toHaveProperty/Attribute("checked")`                                             | `toBeChecked()`                                   |
| `toHaveAttribute("disabled")`                                                     | `toBeDisabled()` / `toBeEnabled()`                |
| `toHaveProperty/Attribute("required")`                                            | `toBeRequired()`                                  |
| `.value` / `toHaveAttribute("value", …)`                                          | `toHaveValue()`                                   |
| `document.activeElement` comparisons                                              | `toHaveFocus()`                                   |
| `getAttribute()` / `hasAttribute()` assertions                                    | `toHaveAttribute()`                               |
| `.className` / `.classList` checks                                                | `toHaveClass()`                                   |
| `.style.*` checks                                                                 | `toHaveStyle()`                                   |
| `.textContent` checks                                                             | `toHaveTextContent()`                             |
| `.innerHTML === ""` / `firstChild === null`                                       | `toBeEmptyDOMElement()`                           |
