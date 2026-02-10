# Frontend Specification — Vue 2 SPA

## Overview

Build a Project & Task Management SPA using Vue 2. This doc captures the frontend requirements, folder structure, components, routing, Vuex store design, API/service rules, event bus requirements, and an implementation checklist.

## Tech Stack (strict)
- Vue 2
- Vue Router
- Vuex
- Axios
- BootstrapVue
- Vuelidate
- JWT-based auth (token handling only)

## High-level Requirements
- Login screen with Vuelidate and BootstrapVue
- Store JWT in `localStorage` and sync with Vuex
- Auto-authenticate if token exists on app load
- Projects module with list, create/edit (modal), detail page
- Tasks nested under Projects with CRUD via modals
- Global event bus to emit/listen for project/task events
- Route guards to protect all routes except `/login`
- `beforeRouteLeave` to warn about unsaved task changes
- Central Axios instance with JWT interceptor and error handler

## Folder Structure (mandatory)

src/
 ├─ components/
 │   ├─ Project/
 │   │   ├─ ProjectList.vue
 │   │   ├─ ProjectItem.vue
 │   │   ├─ ProjectFormModal.vue
 │   │   └─ ProjectDetailHeader.vue
 │   ├─ Task/
 │   │   ├─ TaskList.vue
 │   │   ├─ TaskItem.vue
 │   │   └─ TaskFormModal.vue
 │   └─ Shared/
 │       ├─ ModalWrapper.vue
 │       ├─ ConfirmDialog.vue
 │       └─ ToastNotifications.vue
 ├─ views/
 │   ├─ LoginView.vue
 │   ├─ DashboardView.vue
 │   ├─ ProjectsView.vue
 │   └─ ProjectDetailView.vue
 ├─ router/
 │   └─ index.js
 ├─ store/
 │   ├─ index.js
 │   ├─ modules/auth.js
 │   └─ modules/projects.js
 ├─ services/
 │   ├─ api.js        # central Axios instance
 │   ├─ authService.js
 │   └─ projectService.js
 ├─ bus/
 │   └─ eventBus.js
 └─ App.vue

## Components & Data Flow Rules
- Reusable components only — avoid duplication.
- Pass data via `props` and emit events (`$emit`) for create/update/delete.
- Use Vuex actions for all state changes; components dispatch actions rather than mutating state directly.
- Use computed properties to derive project/task summaries (counts, completion rates).

## Authentication Module

- View: `LoginView.vue` with BootstrapVue form.
- Validation: `Vuelidate` rules (required, email format if needed).
- On successful login (response contains JWT):
  - Save token to `localStorage`.
  - Commit token and `isAuthenticated` to Vuex via `login` action.
  - Set Axios Authorization header via interceptor or after login.
  - Redirect to `/dashboard`.
- On app start: if token exists and is valid (optional lightweight check), auto-dispatch Vuex `login` state restore.

## Projects Module

- Routes:
  - `/projects` — Projects list
  - `/projects/:id` — Project detail
- List: use `b-table` (BootstrapVue) to show projects.
- Create / Edit: use `ProjectFormModal.vue` as a modal component. Emit `created` or `updated` events and dispatch Vuex actions.
- Detail page: shows project metadata and nested tasks (route: `/projects/:id/tasks` nested or child view).

## Tasks Module (nested)

- Tasks are shown inside the Project detail view under nested route `/projects/:id/tasks`.
- CRUD via `TaskFormModal.vue`.
- Task statuses: `Todo`, `In Progress`, `Done` (enum strings).
- Use watchers to respond to route param changes (project id) and reload tasks when `:id` changes.
- Use `beforeRouteLeave` on task editing views/components to warn about unsaved changes.

## Event Bus (mandatory)

- Implement global event bus at `src/bus/eventBus.js` (Vue instance export).
- Emit events from nested components for:
  - `project:created`, `project:updated`, `project:deleted`
  - `task:status-changed`, `task:created`, `task:deleted`
- Global layout (e.g., `App.vue` or `Shared/ToastNotifications.vue`) listens and shows toast/alert notifications.

## Routing & Guards

- Public route: `/login`.
- Protected routes: `/dashboard`, `/projects`, `/projects/:id`, `/projects/:id/tasks`.
- Use a global `beforeEach` guard in `router/index.js` to check Vuex `isAuthenticated` (or token in `localStorage`) and redirect to `/login` if unauthenticated.

## Vuex Store Design

State:
- `token: null | string`
- `isAuthenticated: boolean`
- `projects: []` (array of project objects)
- `activeProject: null | object`

Getters:
- `projectCount` -> `state.projects.length`
- `completedTaskCount` -> derived from `projects` tasks where `status === 'Done'`

Actions:
- `login` (perform login, save token, set auth state)
- `fetchProjects` (load projects via `projectService`)
- `setActiveProject` (set `activeProject` and fetch tasks for it)
- `logout` (clear token, Vuex state, localStorage)

Mutations: standard mutations to set token, set projects, set activeProject, set isAuthenticated.

Important: No direct state mutation in components — always via actions/commits.

## Axios & API Layer

- `services/api.js` exports a configured Axios instance with:
  - Base URL configurable from an environment variable or config file.
  - Request interceptor that attaches `Authorization: Bearer <token>` when token present in Vuex or `localStorage`.
  - Response interceptor for global error handling (401 -> dispatch logout, show toast).
- `services/authService.js` handles `/auth/login` calls.
- `services/projectService.js` provides `getProjects`, `createProject`, `updateProject`, `deleteProject`, `getProjectById` and task-related calls.

## UI & UX Rules
- Use BootstrapVue components for all tables, forms, modals, toasts.
- Use Vuelidate for form validation across login, project form, task form.
- Modal dialogs must be reusable (wrap in `ModalWrapper.vue`).

## Events, Notifications, and Toasts
- Use the event bus to publish events from deeply nested components.
- Central listener in `App.vue` or `Shared/ToastNotifications.vue` displays toasts.

## API Endpoint Suggestions (frontend expectations)
(These are examples the frontend will call — align with backend during integration)
- POST `/auth/login` -> { token }
- GET `/projects` -> [projects]
- POST `/projects` -> created project
- PUT `/projects/:id` -> updated project
- DELETE `/projects/:id` -> ok
- GET `/projects/:id/tasks` -> [tasks]
- POST `/projects/:id/tasks` -> created task
- PUT `/projects/:id/tasks/:taskId` -> updated task
- DELETE `/projects/:id/tasks/:taskId` -> ok

## Implementation Checklist
- [ ] Scaffold Vue CLI / project skeleton (Vue 2)
- [ ] Add BootstrapVue, Vuelidate, Axios, Vuex, Vue Router
- [ ] Implement `services/api.js` with interceptors
- [ ] Implement Auth module + `LoginView.vue`
- [ ] Implement Projects list, create/edit modals, detail view
- [ ] Implement Tasks nested views and modals
- [ ] Implement event bus and global notifications
- [ ] Add route guards and `beforeRouteLeave` warnings
- [ ] Add unit/integration tests for core flows (optional)

## Next Steps
1. Agree on API endpoints and response shapes with backend team.
2. Scaffold the project and add dependencies.
3. Implement auth and token handling first to unblock protected routes.
4. Implement Projects and Tasks modules and wire event bus notifications.

---

File created for frontend reference and implementation planning.
