# 🚀 Setup and Usage Guide

## Prerequisites
*   Python 3.10+
*   MongoDB Atlas Account (Connection String)

## 1. Installation

### Clone and Enter Directory
```bash
git clone <repo_url>
cd "ProjectManager Backend"
```

### Create Virtual Environment
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```
*Note: Ensure `django`, `djangorestframework`, `mongoengine`, etc. are installed.*

## 2. Configuration (`.env`)
Create a `.env` file in the root directory (same level as `manage.py`).
```ini
CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster.mongodb.net/
SECRET_KEY=your_secret_key_here
DEBUG=True
```

## 3. Running the Server
```bash
python manage.py runserver
```
Server will start at `http://127.0.0.1:8000/`.

## 4. API Usage (Endpoints)

Base URL: `http://127.0.0.1:8000/api`

### Auth (`/auth`)
*   `POST /register/`: Body `{'username', 'email', 'password', 'password_confirm'}`
*   `POST /login/`: Body `{'first_credential' (email/user), 'password'}` -> Returns Tokens

### Projects (`/projects`)
*   `GET /`: List my projects. (Requires Token)
*   `POST /`: Create project. Body `{'name', 'description'}`. (Requires Token)
*   `PUT /<id>/`: Update project.
*   `DELETE /<id>/`: Delete project.

### Tasks (`/projects/<pid>/tasks/`)
*   `GET /projects/<pid>/tasks/`: List tasks for project.
*   `POST /projects/<pid>/tasks/`: Create task. Body `{'title', 'status', 'description'}`.
*   `PUT /projects/tasks/<tid>/`: Update task.
*   `DELETE /projects/tasks/<tid>/`: Delete task.

## 🔗 [Back to Index](./Index.md)
