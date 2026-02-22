# AGENTS.md

## Project overview

This is a **React + TypeScript + Vite** personal project. The application is a productivity tool featuring activity/task management, timers, routines, categories.

**Technology Stack:**

- **Frontend:** React 19.2+, TypeScript, TailwindCSS 4.1+
- **Build:** Vite 7.3+ with TypeScript compilation
- **Testing:** Vitest + React Testing Library + User Event + MSW for API mocking
- **Routing:** @tanstack/react-router 1.160+
- **State:** TanStack Query 5.90+, React Hook Form 7.71+
- **Deployment:** Heroku-ready with static file serving

## Build and validation Commands

### 1. Development

```bash
npm run dev          # Starts dev server with --host flag
```

### 2. Build & Type Checking

```bash
npm run type-check   # TypeScript checking only
npm run build        # Full build: tsc + vite build
```

### 3. Code Quality

```bash
npm run prettier:fix # Fix formatting
npm run lint         # ESLint with strict rules
npm run lint:fix     # Auto-fix fixable linting issues
```

### 4. Testing

```bash
npm run test         # Vitest with coverage
npm run test:expert  # Enhanced debugging by outputting 10_000 lines
```

### 5. Complete Validation

```bash
npm run validate:fix # Runs prettier:fix → lint:fix → type-check → test
```

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
