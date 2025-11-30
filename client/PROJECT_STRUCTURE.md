# Project Structure: LearnMatrix
Generated on: 2025-11-30

This document outlines the file and folder structure of the LearnMatrix project.

```
learn-matrix/
├── .env.local
├── .gitignore
├── PENDING_BACKEND_TASKS.md
├── README.md
├── build.log
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
└── src/
    ├── app/
    │   ├── (admin)/          # Admin panel routes
    │   │   ├── admin/
    │   │   └── layout.tsx
    │   ├── (auth)/           # Authentication routes
    │   ├── (dashboard)/      # User dashboard routes
    │   │   ├── ai/
    │   │   ├── daily/
    │   │   ├── dashboard/
    │   │   ├── kanban/
    │   │   ├── leaderboard/
    │   │   ├── pomodoro/
    │   │   ├── practice/
    │   │   ├── profile/
    │   │   ├── progress/
    │   │   ├── resources/
    │   │   ├── settings/
    │   │   └── layout.tsx
    │   ├── api/              # API routes
    │   ├── todos/
    │   ├── error.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   └── page.tsx          # Landing page
    ├── components/
    │   ├── admin/            # Admin-specific components
    │   ├── features/         # Feature-specific components
    │   ├── landing/          # Landing page components
    │   ├── layout/           # Layout components (headers, sidebars)
    │   ├── ui/               # Reusable UI components (shadcn/ui)
    │   ├── CommandMenu.tsx
    │   ├── Onboarding.tsx
    │   ├── theme-provider.tsx
    │   └── theme-toggle.tsx
    ├── context/              # React Context providers
    ├── lib/                  # Libraries and utils
    ├── services/             # External services
    ├── utils/                # Utility functions
    └── middleware.ts         # Next.js middleware
```

## Key Directories

- **`src/app`**: Contains the application routes using Next.js App Router.
  - **`(dashboard)`**: Protected routes for the user dashboard.
  - **`(admin)`**: Protected routes for the admin panel.
- **`src/components/ui`**: Contains reusable UI components, likely from shadcn/ui.
- **`src/lib` & `src/utils`**: Helper functions and configuration files.
