# AGENTS.md

- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.

## Project overview

This is a **React + TypeScript + Vite** personal project. The application is a productivity tool featuring activity/task management, timers, routines, categories.

**Technology Stack:**

It is critial that you leverage the latest and greatest of the current libraries.
If you need to validate versions, check the `package.json` file.

- **Frontend:** React latest, TypeScript, TailwindCSS latest.
- **Build:** Vite 7.3+ with TypeScript compilation
- **Testing:** Vitest + React Testing Library + User Event + MSW for API mocking
- **Routing:** @tanstack/react-router
- **State:** TanStack Query latest, React Hook Form latest
- **Deployment:** Heroku-ready with static file serving

## Build and validation Commands

Feel free to check the `package.json` scripts for more details.
We use `mise`. Some commands for you may require `mise exec` prefix to ensure the correct tool versions are used.

## Project Architecture & Layout

### Core Structure

```
src/
├── components/            # Reusable UI components
│   ├── core/              # Basic UI (Button, Modal, Toggle, etc.)
│   ├── form/              # Form components (TextInput, ComboBox, etc.)
│   └── layout/            # Layout components (Card, Headers, etc.)
├── constants/             # Application-wide constants
├── features/              # Feature-based organization
│   ├── activities/        # Activity management
│   ├── auth/              # Authentication management
│   ├── categories/        # Category management
│   ├── routines/          # Routine management
│   ├── tasks/             # Task management
│   ├── timer/             # Timer functionality
│   └── userPreferences/   # Settings management
├── routes/                # TanStack Router route definitions
├── libs/                  # External lib configurations
│   ├── axios.ts           # API client with interceptors
│   └── tanstack.ts        # Query client setup
├── test/                  # Testing infrastructure
│   ├── handlers/          # MSW API mocks by feature
│   ├── store/             # Test data by feature
│   └── test-utils.ts      # Custom RTL render
├── utils/                 # Utility functions
```

## Plan guidelines

- Once there is no ambiguity in the requirements, breakn down into multiple logical and sensible stages, unless the task is simple enough to be done in one stage.
- Stages should allow for incremental progress and testing, and should be as independent as possible from each other.
- Add a list of verifications to be done at the end of each stage, to ensure that the implementation is correct and meets the requirements before moving on to the next stage.

## Code style guidelines

### General coding guidelines

- Promote DRY code.
- Promote Single Responsibility Principle design.
- Promote the use of Single Source of Truth for data, types, constants.
- Do not use magic numbers or strings.
- Component files .tsx should only contain the component code.
- Do not declare utils functions or types in .tsx files.
- Specify utils in the `utils` directory next to your component / feature.
- Common utils / types must be declared in the `utils` or `types` directory within `src/`.
- Date / time functionality should rely / use the `date-fns` library when possible.
- Never use interpolation in className. Use `clsx` library instead.
- Use `useMemo` and `useCallback` to optimize performance when necessary.
- Ask permission before using `useEffect` in a component. First check `You Might Not Need an Effect` knowledge.
- Follow the structure of the project when creating new files / folders.
- Make smart choices that enhance and supports code readability and maintainability.
- When creating types for something related to a library, consider extending / using the library own types.

### Typescript

- TypeScript strict mode
- Create types in the src/features/[feature]/types directory.
- General types can be created in the src/types directory.
- Rely on TypeScript to infer types when possible.
- Use `interface` by default and `type` for unions or more complex types.
- Never use `any` type. If you need to use it, ask for permission and justify why it's necessary, but look for alternatives first.

## Planning instructions

- First make sure you understand the request. Explore the codebase as necessary.
- Find relevant files by searching for keywords in the codebase / using project structure.
- Create a plan for implementation, outlining the steps needed to complete the request in a To-Do list format.
- Break each item in the To-Do list into actionable, manageable clear tasks (when applicable).
- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.

## Verification instructions

- Make sure you run `npm run validate:fix` to ensure code quality and correctness.
- Review the diff changes, consider this a 'refactor' step in the implementation process.
- Once you have finished the whole implementation, pass your changed files through the `qa.instructions.md` file for review.

## Testing instructions

- **Location:** Place test files in `__tests__` directories next to components
- **Naming:** Use `.spec.tsx` or `.spec.ts` extensions
- **Tools:** Import from `@/test/test-utils` not `@testing-library/react`
- **API Mocking:** Use MSW handlers in `src/test/handlers/[feature]/`
- **Test Data:** Use dummy data from `src/test/store/[feature]/`
- For best practices when testing, refer to `.github/instructions/testing.instructions.md`

## PR instructions

- Title format: [ISSUE_NUMBER] Short descriptive title. Fallback to [CODEX].
- Descriptive title: Must convey that now something is different i.e. "Now only display active routines"
- Body: Must use our `pull_request_template.md` template at the root of the repository.
