# Copilot Instructions for Laboratory Repository

## Repository Overview

This is a **React + TypeScript + Vite** personal laboratory project for experimenting with modern frontend development patterns. The application is a productivity tool featuring activity/task management, timers, routines, categories, and form experiments using React Hook Form.

**Technology Stack:**
- **Frontend:** React 19.1.0, TypeScript, TailwindCSS 4.1.13
- **Build:** Vite 7.1.5 with TypeScript compilation
- **Testing:** Vitest + React Testing Library + MSW for API mocking
- **Routing:** React Router 7.8.2
- **State:** TanStack Query 5.87.1, React Hook Form 7.62.0
- **Deployment:** Heroku-ready with static file serving

**Repository Size:** ~740 packages, medium-sized React application with comprehensive test coverage.

## Build & Validation Commands

**ALWAYS run commands in this exact order to avoid failures:**

### 1. Environment Setup
```bash
# Required: Node.js 22.14.0 (specified in .tool-versions)
# Workaround for CI environments - Puppeteer fails without this:
PUPPETEER_SKIP_DOWNLOAD=true npm install
```

### 2. Development
```bash
npm run dev          # Starts dev server with --host flag (~2s startup)
```

### 3. Build & Type Checking
```bash
npm run type-check   # TypeScript checking only (~1-2s)
npm run build        # Full build: tsc + vite build (~5-6s)
```

### 4. Code Quality
```bash
npm run prettier     # Check formatting (~1s)
npm run prettier:fix # Fix formatting (~2-3s)
npm run lint         # ESLint with strict rules (~2-3s)
npm run lint:fix     # Auto-fix linting issues (~3-4s)
```

### 5. Testing
```bash
npm run test         # Vitest with coverage (~3-4s for 40+ test suites)
npm run test:ui      # Interactive test UI
npm run test:expert  # Enhanced debugging output
```

### 6. Complete Validation
```bash
npm run validate:fix # Runs prettier:fix → lint:fix → type-check → test (~10-15s total)
```

**IMPORTANT TIMINGS:** Most commands are fast (<5s), but initial npm install can take 20+ seconds.

## Project Architecture & Layout

### Core Structure
```
src/
├── app/                    # App setup, routing configuration
│   ├── index.tsx          # Main routing with React Router
│   └── provider.tsx       # Root providers (TanStack Query, etc.)
├── components/            # Reusable UI components
│   ├── core/              # Basic UI (Button, Modal, Toggle, etc.)
│   ├── form/              # Form components (TextInput, ComboBox, etc.)
│   └── layout/            # Layout components (Card, Headers, etc.)
├── features/              # Feature-based organization
│   ├── activities/        # Activity management
│   ├── categories/        # Category management  
│   ├── routines/          # Routine management
│   ├── tasks/             # Task management
│   ├── timer/             # Timer functionality
│   └── userPreferences/   # Settings management
├── pages/                 # Page components matching routes
├── libs/                  # External lib configurations
│   ├── axios.ts           # API client with interceptors
│   └── tanstack.ts        # Query client setup
├── test/                  # Testing infrastructure
│   ├── handlers/          # MSW API mocks by feature
│   ├── store/             # Test data by feature
│   └── test-utils.ts      # Custom RTL render
├── utils/                 # Utility functions
└── experiments/           # Learning/experimental code (excluded from coverage)
```

### Key Configuration Files
- `vite.config.ts` - Vite + Vitest config with coverage setup
- `eslint.config.js` - Comprehensive ESLint rules (React, TypeScript, Testing Library)
- `tsconfig.json` - TypeScript with path aliases (`@/*` → `./src/*`)
- `.prettierrc` - Prettier with TailwindCSS plugin
- `.env.example` - Environment variables (`VITE_API_URL`)
- `.tool-versions` - Node.js 22.14.0 requirement

## GitHub Actions & CI

**Workflow:** `.github/workflows/dependabot-ci.yml`
- **Trigger:** Pull requests (except from brandonrq506)
- **Steps:** npm install → prettier → lint → test
- **Node Version:** Uses `.tool-versions` file
- **Cache:** npm cache enabled

## Environment & Dependencies

**Required Runtime:** Node.js 22.14.0 (specified in `.tool-versions`)

**Environment Variables:**
```bash
VITE_API_URL=http://127.0.0.1:3000  # API base URL
```

## Common Issues & Workarounds

1. **Puppeteer Download Failure:** Always use `PUPPETEER_SKIP_DOWNLOAD=true npm install` in CI environments
2. **Bundle Size Warning:** The build produces a ~919KB chunk - this is expected and doesn't break functionality
3. **Path Aliases:** Use `@/` prefix for imports (e.g., `import { Button } from "@/components/core"`)
4. **TailwindCSS v4:** Uses new Vite plugin integration, not traditional config file

## Testing Guidelines

- **Location:** Place test files in `__tests__` directories next to components
- **Naming:** Use `.spec.tsx` or `.spec.ts` extensions
- **Tools:** Import from `@/test/test-utils` not `@testing-library/react`
- **API Mocking:** Use MSW handlers in `src/test/handlers/[feature]/`
- **Test Data:** Use dummy data from `src/test/store/[feature]/`

## Code Quality Standards

- **ESLint:** Very strict rules including max-lines (170), complexity warnings
- **TypeScript:** Strict mode with unused parameters/locals checks
- **Prettier:** Configured with TailwindCSS plugin for class sorting
- **Testing:** High coverage requirements, proper RTL patterns

## Heroku Deployment

- **Build:** Automatic via `postinstall` script
- **Serve:** `npm run serve-heroku` uses `serve` package
- **Port:** Respects `$PORT` environment variable

---

**TRUST THESE INSTRUCTIONS:** Only search/explore if information is incomplete or found to be incorrect. Following this guide will minimize command failures and exploration time.