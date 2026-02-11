# 📁 Project Module (`project_handler`)

This module manages Projects and Tasks.

## 1. Models (`models.py`)

### `Project`
*   **Fields**: `name`, `description`.
*   **Owner**: A `ReferenceField` linking to the **User** model.
*   **Alias**: Stored in `project_db` connection alias.

### `Task`
*   **Fields**: `title`, `description`, `status` (Todo, In Progress, Done).
*   **Project**: A `ReferenceField` linking to the **Project** model.

## 2. Serializers (`serializers.py`)
*   **ProjectSerializer**:
    *   Makes `owner` read-only (so you can't spoof the owner).
*   **TaskSerializer**:
    *   Validates `status` against allowed choices.
    *   Makes `project` read-only.

## 3. Views (`views.py`)
We use `APIView` for fine-grained control. All views require `IsAuthenticated`.

### `ProjectListCreateAPIView`
*   **GET**: Filters projects by `owner=request.user`. (Users only see their own).
*   **POST**: Creates project, auto-assigns `owner=request.user`.

### `ProjectDetailAPIView`
*   **PUT/DELETE**: First checks `if project.owner == request.user`. Prevents users from deleting others' projects.

### `TaskListCreateAPIView`
*   **GET**: Lists tasks for a specific project.
    *   First checks if project belongs to user.
    *   Supports `?status=` filter.
*   **POST**: Creates task.
    *   Ensures project belongs to user.
    *   Links task to project.

## 4. URLs (`urls.py`)
*   `/` -> List/Create Projects
*   `/<id>/` -> Detail Projects
*   `/<id>/tasks/` -> List/Create Tasks
*   `/tasks/<id>/` -> Detail Tasks

## 🔗 [Back to Index](./Index.md)
