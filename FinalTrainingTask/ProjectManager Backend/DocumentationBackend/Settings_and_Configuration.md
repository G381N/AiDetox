# ⚙️ Settings and Database Configuration

This document explains the critical configurations made in `ProjectManagerCore/settings.py` and `ProjectManagerCore/db.py` to enable MongoDB and JWT support.

## 1. `settings.py` Modifications

### 🌍 Environment Variables
We use `python-dotenv` to load sensitive data from a `.env` file.
```python
load_dotenv(BASE_DIR / ".env")
MONGO_URI = os.getenv("CONNECTION_STRING")
SECRET_KEY = os.getenv('SECRET_KEY', ...)
```

### 📦 Installed Apps
We added necessary third-party and local apps:
```python
INSTALLED_APPS = [
    ...,
    'rest_framework',              # DRF
    'rest_framework_mongoengine',  # MongoDB support for DRF
    'corsheaders',                 # CORS support
    'auth_handler',                # Our Auth App
    'project_handler',             # Our Project App
]
```

### 🔐 REST Framework Configuration
We globally configured DRF to use our custom JWT backend and require authentication by default.
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'auth_handler.backends.MongoJWTAuthentication', # <--- Our Custom Backend
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',   # <--- Secure by default
    ),
    ...
}
```

### ⏳ SimpleJWT Settings
Configured token lifespans.
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),  # Short lived access
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # Long lived refresh
    'AUTH_HEADER_TYPES': ('Bearer',),                # Formatting: "Bearer <token>"
}
```

### 🗄️ Database Initialization
Django's default ORM is SQL-based (sqlite3/postgres). Since we are using **MongoEngine** (an ODM for MongoDB), we don't use the standard `DATABASES` setting for our app data.
Instead, we initialize the connection explicitly at startup:
```python
# settings.py
try:
    from .db import init_db
    init_db()  # <--- Connects to Atlas
except Exception:
    pass
```

---

## 2. `db.py` - The Connection Logic

Located at `ProjectManagerCore/db.py`. This file handles the actual connection to MongoDB Atlas.

### Why do we need this?
Django doesn't natively support MongoDB. `mongoengine` needs to be "connected" globally when the app starts.

### The Logic
```python
import mongoengine
import os

def init_db():
    mongo_uri = os.getenv("CONNECTION_STRING")
    
    # We define two aliases using the SAME connection string.
    # This keeps data in the same cluster but allows logical separation if needed via 'db_alias' in models.
    
    # 1. Connection for User Data
    mongoengine.connect(
        alias="auth_db",
        host=mongo_uri,
        db="project_manager_auth" # Database Name 1
    )

    # 2. Connection for Projects/Tasks
    mongoengine.connect(
        alias="project_db",
        host=mongo_uri,
        db="project_manager"      # Database Name 2
    )
```

### 🔗 [Back to Index](./Index.md)
