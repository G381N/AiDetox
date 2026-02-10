# Backend Specification — Django + DRF + MongoEngine

## Overview

Build a REST API for a Project & Task Management system using:
- Django
- Django REST Framework
- MongoEngine
- django-rest-framework-mongoengine
- MongoDB
- JWT Authentication (SimpleJWT)

API must be JSON-only, frontend-ready for the Vue 2 SPA, and enforce ownership-based permissions.

## Core Requirements

1. Authentication

- JWT-based auth using `djangorestframework-simplejwt`.
- Endpoints:
  - `POST /api/auth/login/` — returns `access` and `refresh` tokens
  - `POST /api/auth/register/` — create user and return tokens
- All endpoints protected except login/register.

2. Data Models (MongoEngine)

- `User`
  - `email` (unique)
  - `password` (hashed)
- `Project`
  - `name`
  - `description`
  - `owner` (reference to `User`)
  - `created_at`
- `Task`
  - `title`
  - `description`
  - `status` (enum: `Todo`, `In Progress`, `Done`)
  - `project` (reference to `Project`)
  - `created_at`

3. API Endpoints

Projects
- `GET /api/projects/` — list user's projects (paginated)
- `POST /api/projects/` — create project (owner auto-set to current user)
- `PUT /api/projects/:id/` — update project (owner only)
- `DELETE /api/projects/:id/` — delete project (owner only)

Tasks
- `GET /api/projects/:id/tasks/` — list tasks for project (owner only; support status filter)
- `POST /api/projects/:id/tasks/` — create task under project
- `PUT /api/tasks/:id/` — update task (ensure ownership via project.owner)
- `DELETE /api/tasks/:id/` — delete task (ensure ownership)

4. Permissions & Security

- Users may access only their own projects and tasks.
- Validate ownership on every modifying or listing request (filter by `owner`).
- Use DRF permissions and authentication classes; return clean error responses (400/401/403/404).

5. Architecture Rules

- Separate concerns into modules: `models`, `serializers`, `views`, `urls`, `permissions`, `services` (if needed).
- Keep business logic out of views — put it in serializers, managers, or service functions.
- Consistent response structure: `{ "success": bool, "data": ..., "error": { "code": "...", "message": "..." } }` for errors.

6. Integration Expectations

- JSON-only responses.
- CORS settings to allow the frontend origin (configurable).
- Paginated responses for lists.

Bonus
- Pagination for projects/tasks (use DRF pagination classes adapted for mongoengine).
- Task filtering by `status` via query params: `?status=Done`.

## Project File Structure (recommended)

backend/
 ├─ manage.py
 ├─ project_config/
 │   ├─ settings.py
 │   ├─ urls.py
 │   └─ wsgi.py
 ├─ apps/
 │   ├─ users/
 │   │   ├─ models.py
 │   │   ├─ serializers.py
 │   │   ├─ views.py
 │   │   └─ urls.py
 │   └─ projects/
 │       ├─ models.py
 │       ├─ serializers.py
 │       ├─ views.py
 │       ├─ permissions.py
 │       └─ urls.py
 ├─ requirements.txt
 └─ README.md

## Important Implementation Notes

- Use `mongoengine.Document` classes in `models.py` for `User`, `Project`, and `Task`.
- Hash passwords on registration using Django's `make_password` / `check_password` utilities or `django.contrib.auth.hashers`.
- For authentication integration, use `SimpleJWT` and write an authentication backend or adapter to validate tokens and retrieve MongoEngine-based `User` objects.
- Use `django-rest-framework-mongoengine` to get DRF-compatible serializers/viewsets for mongoengine objects, or write custom `Serializer` classes mapping to `mongoengine` documents.

## Serializers

- `UserSerializer` (registration): validate email uniqueness, hash password on create.
- `ProjectSerializer`: read/write fields; owner should be read-only on input and set from `request.user` in `create`.
- `TaskSerializer`: include `status` choices and validate `project` ownership on create/update.

## Views & Permissions

- Prefer class-based views (`APIView`, `GenericAPIView`, or `ViewSet` equivalents from `drf-mongoengine`).
- Implement custom permission `IsOwner` that checks object owner (for detail/modify) and `IsProjectOwner` for task endpoints.
- Use service layer functions for operations that involve multiple steps (e.g., creating a task and emitting domain events).

## URLs

- Mount API under `/api/`.
- Example routes in `project_config/urls.py`:
  - `path('api/auth/', include('apps.users.urls'))`
  - `path('api/projects/', include('apps.projects.urls'))`

## Error Handling

- Return consistent error responses with HTTP status codes.
- Map common exceptions to JSON responses (e.g., `DoesNotExist` → 404, `PermissionDenied` → 403).

## Pagination & Filtering

- Use DRF pagination classes adapted to mongoengine querysets.
- Allow `page` and `page_size` query params.
- Support `?status=` filter for task lists.

## Testing

- Provide tests for: registration/login, project CRUD (ownership), task CRUD (ownership & status), permission enforcement, pagination and filtering.

## Implementation Checklist

- [ ] Create Django project and app scaffolding
- [ ] Configure MongoEngine connection in `settings.py`
- [ ] Install and configure `djangorestframework`, `mongoengine`, `django-rest-framework-mongoengine`, `djangorestframework-simplejwt`
- [ ] Implement `User` registration and login endpoints
- [ ] Implement `Project` and `Task` models, serializers, and views
- [ ] Implement ownership permissions and attach to views
- [ ] Add pagination and filtering
- [ ] Add CORS and security settings
- [ ] Write tests and docs

## Example Response Shapes

Success (list):

{
  "success": true,
  "data": {
    "results": [ /* items */ ],
    "count": 123,
    "next": "...",
    "previous": null
  }
}

Error:

{
  "success": false,
  "error": {
    "code": "permission_denied",
    "message": "You do not have permission to perform this action."
  }
}

## Next Steps

1. Confirm exact user model fields and whether to reuse Django `auth.User` or a custom MongoEngine `User` document.
2. Scaffold the Django project and install dependencies.
3. Implement auth endpoints and token plumbing first to secure the rest of the API.

---

File created for backend reference and implementation planning.
