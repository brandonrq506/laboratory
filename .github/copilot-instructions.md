# Laboratory Project Knowledge

## About

Laboratory is a Web Application directed to people wanting to track their daily activities.
They can do so through the use of Routines and Tasks.
Users can define a list of `scheduled` tasks, have one `in_progress` task, and a list of `completed` tasks.
This enables users to improve their time management, find areas for productivity improvement, and track their progress over time.

## Project Structure

- The Laboratory project is organized into several directories:
  - `src`: Contains the source code for the application.
    - `app`: Contains the React Router configuration and global Context Providers.
    - `components`:
      - `core`: Contains core components used across the application.
      - `form`: Contains form components used across the application.
      - `layout`: Contains layout components used across the application.
    - `constants`: Contains text constants used across the application.
    - `features`: Contains feature-specific code.
      - `activities`: Contains components, hooks, types and API calls and hooks.
      - `auth`: Contains components, hooks, types and API calls and hooks.
      - `categories`: Contains components, hooks, types and API calls and hooks.
      - `colors`: Contains components, hooks and utils.
      - `routines`: Contains components, hooks, types and API calls and hooks.
      - `tasks`: Contains components, hooks, types and API calls and hooks.
      - `user`: Contains components, hooks, types and API calls and hooks.
      - `userPreferences`: Contains components, hooks, types and API calls and hooks.
    - `hooks`: Contains custom hooks used across the application.
    - `libs`: Contains library configuration. Tanstack QUery and Axios configuration files are located here.
    - `pages`: Contains the main pages of the application and components only used in those pages.
    - `test`: Contains the set-up and configuration for testing.
      - `handlers`: Contains test handlers for mocking API responses.
      - `store`: Contains dummy data to be used in tests.
    - `types`: Contains common types.
    - `utils`: Contains common utility functions.
  - `eslint.config.js`: Configuration file for ESLint.

## Testing Conventions

### Vitest

- Please reference [Testing Instructions](./instructions/testing.instructions.md) for more details.

## TypeScript

- Create types in the src/features/[feature]/types directory
- Use `interface` for defining object shapes and `type` for unions or more complex types.
- Rely on TypeScript to infer types when possible.
- Never use `any` type.

## General programming notes

- Ensure you practice TDD (Test Driven Development) by writing tests before implementing the feature.
- Variables should have descriptive and concise names.
- Do not use magic numbers or strings.
- Component files .tsx should only contain the component code.
- Do not declare utils functions or types in .tsx files.
- Specific utils / types must be declared in the `utils` or `types` directory next to your component / feature.
- Common utils / types must be declared in the `utils` or `types` directory within `src/`.
- Practice DRY (Don't Repeat Yourself).
- Ensure Single Responsibility Principle (SRP) is followed.
- Ensure you use SSoT (Single Source of Truth) for data, types, constants, etc.
- Date / time formatting and functions should be done using the `date-fns` library.
- Never use interpolation in className. Use `clsx` library instead.
- Use `useMemo` and `useCallback` to optimize performance when necessary.
- Ask permission before using `useEffect` in a component.
- Follow the structure of the project when creating new files / folders.
- Make smart choices that enhance and supports code readability and maintainability.
- When creating types for something related to a library, consider extending / using the library own types.

## How you will go about processing a request

- Start by understanding the request and gathering all necessary information from files.
- Create a plan for implementation, outlining the steps needed to complete the request in a To-Do list format.
- Take the item from the To-Do list and break it down into actionable, manageable clear tasks (when applicable).
- Implement the solution step by step, testing as you go.
- Then move onto the next item of the To-Do list.
- Once the implementation of each of the To-Do list items is complete, review the code for any potential improvements.
- Once you have finished the whole implementation, pass your changed files through the `qa.instructions.md` file for review.
