# Backend Documentation Index

Welcome to the ProjectManager Backend documentation. This project is a Django-based REST API that uses MongoDB (via MongoEngine) for data storage and JWT for authentication.

## 📖 How This Project Was Made (The Logic Flow)

This section outlines the step-by-step process of how this backend was constructed, from initialization to the final API endpoints.

### 1. 🛠️ Environment & Dependencies
*   **Virtual Environment**: A python virtual environment (`venv`) was created to isolate dependencies.
*   **Dependencies**: Key packages were installed:
    *   `django` (The web framework)
    *   `djangorestframework` (For building APIs)
    *   `mongoengine` & `django-rest-framework-mongoengine` (For MongoDB integration)
    *   `djangorestframework-simplejwt` (For JWT Authentication)
    *   `python-dotenv` (For managing environment variables)
    *   `django-cors-headers` (To allow frontend communication)

### 2. 🚀 Project Initialization
*   Started a new Django project: `ProjectManagerCore`.
*   Created two main applications:
    1.  `auth_handler`: Manages user registration, login, and authentication validation.
    2.  `project_handler`: Manages projects and tasks logic.

### 3. ⚙️ Configuration
We heavily customized `settings.py` to support MongoDB and JWT instead of the default SQL/Session setup.
*   **[Read more about Settings & DB Configuration](./Settings_and_Configuration.md)**

### 4. 🔐 Authentication Module (`auth_handler`)
This module handles everything related to users.
*   **Models**: Created a custom `User` model using MongoEngine.
*   **Serializers**: logic to validate registration and login data.
*   **Views**: API endpoints for `/register` and `/login`.
*   **Backends**: Custom `MongoJWTAuthentication` to make Django understand JWTs with MongoDB user objects.
*   **[Read detailed Auth Module Documentation](./Auth_Module.md)**
*   **[Read about Custom Authentication Backend](./Custom_Authentication.md)**
*   **[Read specific JWT Logic](./JWT_Logic.md)**

### 5. 📂 Project Module (`project_handler`)
This module handles the core business logic (Projects & Tasks).
*   **Models**: `Project` and `Task` documents.
*   **Serializers**: Validation and transformation of project/task data.
*   **Views**: logic for CRUD operations (Create, Read, Update, Delete) with permission checks.
*   **URLs**: Routing for `/api/projects` and `/api/tasks`.
*   **[Read detailed Project Module Documentation](./Project_Module.md)**

### 6. 🔗 Core Routing
*   The main entry point `ProjectManagerCore/urls.py` routes traffic to the respective apps:
    *   `/api/auth/` -> `auth_handler.urls`
    *   `/api/projects/` -> `project_handler.urls`

---

## 📚 Detailed Documentation Links

*   **[Settings & Database Configuration](./Settings_and_Configuration.md)**: Explains `settings.py` and `db.py`.
*   **[JWT Explanation](./JWT_Logic.md)**: Conceptual guide on how JSON Web Tokens work here.
*   **[Data Flow Diagram](./Data_Flow.md)**: Visualizing how a request travels through the system.
*   **[Setup & Usage Guide](./Setup_and_Usage.md)**: Instructions on how to run and test this project.
*   **[Custom Authentication](./Custom_Authentication.md)**: Deep dive into `backends.py`.

---

## 🚦 Quick Application Flow Summary

1.  **Request** enters `ProjectManagerCore/urls.py`.
2.  **Authentication Middleware** (via `backends.py`) checks headers for a JWT.
    *   If valid, it attaches a `User` object to `request.user`.
3.  **URL Dispatcher** sends request to the matching View (in `auth_handler` or `project_handler`).
4.  **Permissions** (`IsAuthenticated`) check if `request.user` is valid.
5.  **View** executes business logic:
    *   Calls **Serializer** to validate data.
    *   Interacts with **Models** to query/save to MongoDB.
6.  **Response** is returned (JSON).
