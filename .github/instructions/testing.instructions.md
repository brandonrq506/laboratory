---
applyTo: "**/*.spec.{tsx,ts}"
---

# Testing Instructions

This project uses [Vitest](https://vitest.dev/) as the test runner and assertion library.
This project uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing React components.
This project uses [testing-library/jest-dom](https://github.com/testing-library/jest-dom) for custom matchers.
This project uses [UserEvent](https://testing-library.com/docs/user-event/intro/) for simulating user interactions.
This project uses [MSW](https://mswjs.io/) for mocking API requests.

## General

- Use `.spec.tsx` or `.spec.ts` as the file extension for test files.
- Place test files in a `__tests__` directory next to the component being tested.
- Use `describe` to group related tests.
- Use `it` to define individual test cases.
- Write descriptive test names that reflect user goals.

## React Testing Library

- Import `render` and `screen` from `@/test/test-utils`.
- Use `render` to render your component in tests.
- Use `screen` to query elements in the rendered component.
- Use `userEvent` to simulate user interactions.
- Avoid manually wrapping updates in `act()` since React Testing Library automatically handles it.
- For components that receive data through props, look for dummy data in `src/test/store/[feature]`.
- For components that receive data through API calls, use MSW handlers in `src/test/handlers/[feature]`.

### Queries

- Use `getByLabelText` to query form fields.
- Use `getByText` to query non-interactive elements.
- Use `getByRole` as your top preference.
- Use `getByDisplayValue` for controlled inputs showing a specific value
- It is forbidden to use `getByTestId` unless absolutely necessary.
- Use `queryBy*` methods to check for the absence of elements.
- Use `await findBy*` for elements that appear asynchronously.

## UserEvent

- Import `userEvent` from `@testing-library/user-event`.
- Perform `const user = userEvent.setup();` in the first line of each individual test.
- Always use `await` when calling user events to ensure they are processed correctly.
- Tests using UserEvent must be `async` functions.

## MSW

- Structure handlers in `src/test/handlers/[feature]`.
- Ensure you split handlers by feature in `src/test/handlers/[feature]`.
- Utilize overrides to handle on-demand error-state and empty-response.
- Use `http.[method]` to define handlers for specific HTTP methods.
- Use `return HttpResponse.json` to return JSON responses.
- Return the most relevant http status code for the response.
- Import `const API_URL = import.meta.env.VITE_API_URL;`
- Complete URLs with endpoints constants from `"@/libs/axios"`.
