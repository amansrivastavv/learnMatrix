# 🚀 Pending Backend & API Tasks to Complete Project

Currently, the application is running in **"Mock Mode"** using `src/services/api.ts`. To make it a real, production-ready application, you need to implement a backend (Node.js, Python, Go, or PHP) that provides the following APIs.

## 1. Authentication & Users
**Status:** ❌ Mocked in `AuthContext` & `api.ts`
**Required Endpoints:**
- `POST /api/auth/register` - Create new user (Name, Email, Password).
- `POST /api/auth/login` - Authenticate and return **JWT Token**.
- `GET /api/auth/me` - Get current user details using JWT.
- `POST /api/auth/refresh` - Refresh expired access tokens.
- `PUT /api/users/profile` - Update bio, location, social links.
- **Role Management**: Ensure `user` table has a `role` column (`admin` | `user`).

## 2. Core Dashboard Data
**Status:** ❌ Mocked in `api.dashboard`
**Required Endpoints:**
- `GET /api/dashboard/stats` - Return total hours, streak, questions solved.
- `GET /api/dashboard/activity` - Return recent activity logs (last 5-10 items).
- `GET /api/dashboard/heatmap` - Return daily study intensity for the contribution graph.

## 3. Features Implementation

### 🧠 AI Roadmap
**Status:** ⚠️ Partial (Next.js API route exists but mocks OpenAI)
**Pending:**
- Integrate **OpenAI/Gemini API** in `src/app/api/ai/roadmap/route.ts`.
- `POST /api/roadmaps` - Save generated roadmap to DB.
- `GET /api/roadmaps` - List user's saved roadmaps.
- `PUT /api/roadmaps/:id/progress` - Update topic completion status.

### 💻 DSA Practice
**Status:** ❌ Mocked in `api.practice`
**Required Endpoints:**
- `GET /api/practice` - List all questions.
- `POST /api/practice` - Add a new custom question.
- `PATCH /api/practice/:id/toggle` - Mark question as Solved/Pending.

### 📝 Daily Journal
**Status:** ❌ Mocked in `api.daily`
**Required Endpoints:**
- `GET /api/journal` - Get past entries.
- `POST /api/journal` - Save mood, reflection, and hours.

### 📋 Kanban Board
**Status:** ⚠️ LocalStorage Only
**Pending:**
- `GET /api/kanban/tasks` - Fetch user tasks.
- `POST /api/kanban/tasks` - Create task.
- `PUT /api/kanban/tasks/:id` - Update status/position.
- `DELETE /api/kanban/tasks/:id` - Delete task.

## 4. Admin Panel (Critical)
**Status:** ❌ Mocked Data
**Required Endpoints:**
- `GET /api/admin/users` - List all users with pagination & search.
- `PATCH /api/admin/users/:id/role` - Promote/Demote users.
- `PATCH /api/admin/users/:id/ban` - Ban/Unban users.
- `GET /api/admin/analytics` - Aggregated system stats (Total Users, Roadmaps created).
- `GET /api/admin/logs` - System activity logs.

## 5. Database Schema Recommendations
You will need the following tables/collections:
1.  **Users**: `id`, `name`, `email`, `password_hash`, `role`, `created_at`.
2.  **Profiles**: `user_id`, `bio`, `location`, `social_links`, `streak`.
3.  **Roadmaps**: `id`, `user_id`, `title`, `data (JSON)`, `progress`.
4.  **Questions**: `id`, `user_id`, `title`, `difficulty`, `topic`, `status`.
5.  **JournalEntries**: `id`, `user_id`, `mood`, `content`, `date`.
6.  **Tasks** (Kanban): `id`, `user_id`, `title`, `status` (todo/doing/done).
7.  **ActivityLogs**: `id`, `user_id`, `action`, `timestamp`.

---
**Next Step:** Choose your backend stack (Node/Express, Next.js Server Actions, Django, Laravel) and start implementing these endpoints one by one.
