# 🌊 Data Flow

This document visualizes how data moves through the application for a typical request.

## Example Scenario: Creating a Task

**User Action**: Only authorized users can create a task for their project.
**Request**: `POST /api/projects/123ab/tasks/`
**Body**: `{"title": "Fix Bug", "status": "Todo"}`

### 1. Core Entry `[urls.py]`
The request hits `http://127.0.0.1:8000`. Django looks at `ProjectManagerCore/urls.py`.
It matches `/api/projects/` -> forwards to `project_handler/urls.py`.

### 2. Authentication Layer `[backends.py]`
Before the view code runs, DRF triggers `MongoJWTAuthentication`.
*   **Input**: `Authorization: Bearer <token>`
*   **Process**: Decodes token -> Extract ID -> Query Mongo -> Get User Object.
*   **Output**: `request.user` is now populated with the current user.

### 3. URL Routing `[project_handler/urls.py]`
Matches path `<str:project_id>/tasks/` to the view `TaskListCreateAPIView`.

### 4. View Logic `[views.py]` (`TaskListCreateAPIView.post`)
1.  **Validation**: Checks if project `123ab` exists.
2.  **Permission**: Checks if `project.owner == request.user`. Only owner can add tasks.
3.  **Data Validation**: Checks if `title` is provided (using helper `validate_keys`).
4.  **Creation**:
    *   Creates a `Task` instance.
    *   Assigns `title`, `status`.
    *   Assigns `project` object (linking the task to the project).
    *   Calls `.save()`.

### 5. Model Layer `[models.py]` (`Task` Model)
`mongoengine` takes the python object and converts it to a BSON document.
It establishes a connection to MongoDB Atlas (via `db.py` settings) and inserts the document into the `tasks` collection.

### 6. Serializer Layer `[serializers.py]` (`TaskSerializer`)
The saved Task object is passed to `TaskSerializer`.
*   It converts the MongoDB object (ObjectIds, Dates) into standard JSON format.

### 7. Response
The JSON data is wrapped in a defined structure and returned to the user with `HTTP 201 Created`.

```json
{
    "task": {
        "id": "...",
        "title": "Fix Bug",
        "status": "Todo",
        "created_at": "..."
    },
    "message": "Task Created Successfully ..."
}
```

## 🔗 [Back to Index](./Index.md)
