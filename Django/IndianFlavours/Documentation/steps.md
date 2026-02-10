# IndianFlavours - Development Steps

A Django REST API project with MongoDB (MongoEngine) for a restaurant application.

---

## Step 1: Install Dependencies

```bash
pip install django mongoengine djangorestframework django-rest-framework-mongoengine werkzeug python-dotenv
```

**Dependencies:**
| Package | Purpose |
|---------|---------|
| `django` | Web framework |
| `mongoengine` | MongoDB ODM for Python |
| `djangorestframework` | REST API toolkit |
| `django-rest-framework-mongoengine` | DRF integration with MongoEngine |
| `werkzeug` | Password hashing utilities |
| `python-dotenv` | Load environment variables from `.env` file |

---

## Step 2: Create Project & Apps

```bash
# Create Django project
django-admin startproject RestaurantCore .

# Create apps
python manage.py startapp auth_service
python manage.py startapp menu_service
```

**Project Structure:**
```
IndianFlavours/
├── RestaurantCore/      # Core settings
├── auth_service/        # Authentication (register/login)
├── menu_service/        # Menu & Category CRUD
├── .env                 # Connection string
└── manage.py
```

---

## Step 3: Configure Core Settings

### 3.1 Create `.env` file (root directory)

```env
CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
```

### 3.2 Create `RestaurantCore/db.py`

```python
from pathlib import Path
import os
from dotenv import load_dotenv
from mongoengine import connect

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
ATLAS_URL = os.getenv("CONNECTION_STRING")

if not ATLAS_URL:
    raise Exception("The Connection String is not set in the .env file.")

# Two separate databases
connect(db="flavours_auth_db", alias="auth_db", host=ATLAS_URL)
connect(db="flavours_menu_db", alias="menu_db", host=ATLAS_URL)
```

### 3.3 Update `RestaurantCore/settings.py`

Add installed apps:
```python
INSTALLED_APPS = [
    'auth_service',
    'menu_service',
    'rest_framework',
    # ... default apps
]
```

Import db at the bottom:
```python
import RestaurantCore.db
```

### 3.4 Configure URLs in `RestaurantCore/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("auth_service.urls")),
    path("api/menu/", include("menu_service.urls")),
]
```

---

## Step 4: Build Auth Service

### 4.1 Model (`auth_service/models.py`)

```python
from mongoengine import Document, StringField, DateTimeField, EmailField
from datetime import datetime

class User(Document):
    email     = EmailField(required=True, unique=True)
    username  = StringField(required=True, unique=True)
    password  = StringField(required=True, min_length=10)
    role      = StringField(choices=["USER", "ADMIN"], default="USER")
    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {
        "db_alias": "auth_db",
        "collection": "users"
    }
```

### 4.2 Security (`auth_service/security.py`)

```python
from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password: str) -> str:
    return generate_password_hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return check_password_hash(hashed, password)
```

### 4.3 Serializer (`auth_service/serializer.py`)

```python
from rest_framework_mongoengine.serializers import DocumentSerializer
from auth_service.models import User

class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = "__all__"
```

### 4.4 Views (`auth_service/views.py`)

- **Register**: Validates email, username, password match & length, hashes password, saves user
- **Login**: Supports username OR email login, verifies password

### 4.5 URLs (`auth_service/urls.py`)

```python
from django.urls import path
from .views import register, login

urlpatterns = [
    path("register/", register),  # POST /api/auth/register/
    path("login/", login),        # POST /api/auth/login/
]
```

---

## Step 5: Build Menu Service

### 5.1 Models (`menu_service/models.py`)

```python
class Category(Document):
    name = StringField(required=True, unique=True)
    meta = {"db_alias": "menu_db", "collection": "categories"}

class Review(EmbeddedDocument):
    username = StringField(required=True)
    rating   = IntField(required=True, min_value=1, max_value=5)
    comment  = StringField(max_length=250)

class Menu(Document):
    fname     = StringField(required=True, max_length=50)
    fnonveg   = BooleanField(required=True)
    fprice    = FloatField(required=True)
    fserves   = IntField(required=True)
    tags      = ListField(StringField())
    nutrition = DictField()
    variants  = ListField(DictField())
    category  = ReferenceField(Category, reverse_delete_rule=NULLIFY, required=True)
    reviews   = ListField(EmbeddedDocumentField(Review))
    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {"db_alias": "menu_db", "collection": "menu", "indexes": ["fname"]}
```

### 5.2 Serializers (`menu_service/serializer.py`)

- `ReviewSerializer` - EmbeddedDocumentSerializer
- `CategorySerializer` - DocumentSerializer
- `MenuSerializer` - DocumentSerializer with custom `to_representation` for category expansion

### 5.3 Views (`menu_service/views.py`)

**MenuView (APIView):**
- `GET` - Get all menus or single by `?id=`
- `POST` - Create new menu item
- `PATCH` - Update menu item by `id` in body

**CategoryView (APIView):**
- `GET` - List all categories
- `POST` - Create new category

### 5.4 URLs (`menu_service/urls.py`)

```python
from django.urls import path
from .views import MenuView, CategoryView

urlpatterns = [
    path("", MenuView.as_view()),                  # /api/menu/
    path("categories/", CategoryView.as_view()),   # /api/menu/categories/
]
```

---

## Step 6: Testing with Postman

### Auth Service

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/register/` | `{"email", "username", "password", "conf_password"}` |
| POST | `/api/auth/login/` | `{"username", "password"}` (username or email) |

### Menu Service

| Method | Endpoint | Body/Params |
|--------|----------|-------------|
| GET | `/api/menu/` | - |
| GET | `/api/menu/?id=<id>` | - |
| POST | `/api/menu/` | `{"fname", "fnonveg", "fprice", "fserves", "category"}` |
| PATCH | `/api/menu/` | `{"id", ...fields to update}` |
| GET | `/api/menu/categories/` | - |
| POST | `/api/menu/categories/` | `{"name"}` |

---

## Running the Server

```bash
python manage.py runserver
```

API available at: `http://127.0.0.1:8000/`

---

## Database Structure

| Database | Collection | Purpose |
|----------|------------|---------|
| `flavours_auth_db` | `users` | User authentication data |
| `flavours_menu_db` | `categories` | Food categories |
| `flavours_menu_db` | `menu` | Menu items |
