# 📘 Django vs. Django Rest Framework (DRF)

This guide explains the key differences between the "Standard Django" approach (what you built specifically in `LearningAttempt1`) and the "Django Rest Framework" (DRF) approach, followed by a complete step-by-step guide to building the DRF version.

---

## 🥊 The Comparison

Both approaches can build the exact same API, but they do it differently.

| Feature | Standard Django (The "Bare Metal" Way) | Django Rest Framework (The "Pro" Way) |
| :--- | :--- | :--- |
| **Parsing Data** | **Manual**: You must use `json.loads(request.body)` to read incoming data. | **Automatic**: DRF gives you `request.data`, which is already parsed and ready to use. |
| **Validation** | **Manual**: You stick `if` statements everywhere to check if fields exist or if emails are valid. | **Serializers**: You define rules once (e.g., `email = EmailField`). DRF runs `is_valid()` and handles all checks for you. |
| **Responses** | **Manual**: You return `JsonResponse`. Browsers just see text. | **Smart**: You return `Response`. DRF gives you a **Browsable API Website** where you can test your endpoints visually. |
| **Status Codes** | You type hard numbers like `201` or `404`. | You use readable constants like `status.HTTP_201_CREATED`. |
| **Best For** | Learning the basics, very simple APIs, or when you don't want extra dependencies. | Production APIs, teams, automated documentation, and complex data. |

### 🧠 The Shift in Logic
*   **Old Way (Standard)**: "Receive text -> Turn to Dict -> Check keys manualy -> Save -> Return JSON"
*   **New Way (DRF)**: "Receive Request -> Pass to Serializer (Validator) -> If Valid, Save -> Return Response"

---

## 🚀 Guide: Building the DRF Project From Scratch

Here is the complete, detailed guide to rebuilding your backend using Django Rest Framework.

### 📦 Phase 1: Installation & Setup

1.  **Install Dependencies**
    Run this command to install Django, the Rest Framework, the Mongo engine, and CORS headers.
    ```powershell
    pip install django djangorestframework mongoengine werkzeug django-cors-headers markdown django-filter
    ```

2.  **Start the Project**
    Create a new project folder (e.g., `DjangoDRF`) and enter it. Then run:
    ```powershell
    django-admin startproject ProjectCore .
    python manage.py startapp user_auth
    ```
    *(The `.` ensures `manage.py` is in your current folder, not a subfolder).*

### ⚙️ Phase 2: Configuration (`settings.py`)

Open `ProjectCore/settings.py` and make these 3 changes:

**1. Register Apps**
Add `rest_framework`, `corsheaders`, and your new app `user_auth`.
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # --- Custom Apps ---
    'user_auth',
    'rest_framework',  # Powers the API
    'corsheaders',     # Allows Frontend connection
]
```

**2. Add Middleware**
Add the CORS middleware. **It must be at the top** (or at least before `CommonMiddleware`) so it can check permissions before Django processes the request.
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # <--- Add This
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... rest of list
]
```

**3. Database & CORS Config**
Paste this at the very bottom of the file.
```python
# --- MongoDB Configuration ---
from mongoengine import connect
connect(
    db="auth_db",
    host="mongodb+srv://gebingeorge_db_user:GiEavpF6Lpv4morE@cluster0.vdafbjx.mongodb.net/",
    alias="default"
)

# --- CORS Settings ---
CORS_ALLOW_ALL_ORIGINS = True
```

### 🧱 Phase 3: The Code

**1. The Model (`user_auth/models.py`)**
This remains the same as standard Django because `mongoengine` works independently of DRF.
```python
from mongoengine import Document, EmailField, StringField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)

    def set_password(self, raw_password):
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)
```

**2. The Serializer (`user_auth/serializers.py`)**
*Create this new file.* This is the **Gatekeeper**. It checks if data is correct before your View ever touches it.
```python
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    # This ensures the email is valid format (has @, domain, etc.)
    email = serializers.EmailField()
    # write_only=True means this field is accepted IN, but never sent OUT (security)
    password = serializers.CharField(write_only=True)
```

**3. The Views (`user_auth/views.py`)**
Notice how much cleaner this is. No manual JSON parsing!
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def signup(request):
    # 1. Pass data to Serializer -> It handles 'json.loads' automatically
    serializer = UserSerializer(data=request.data)
    
    # 2. auto-validation -> checks email format, missing fields, etc.
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # 3. Business Logic
        if User.objects(email=email).first():
            return Response({"error": "User exists"}, status=status.HTTP_409_CONFLICT)

        user = User(email=email)
        user.set_password(password)
        user.save()
        
        # 4. Standardized Response
        return Response({"message": "Created"}, status=status.HTTP_201_CREATED)
    
    # If invalid, sends back specific errors (e.g., "Enter a valid email address.")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    # For login, we can just grab data directly if we want simple checking
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects(email=email).first()
    
    if not user or not user.check_password(password):
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({"message": "Success"}, status=status.HTTP_200_OK)
```

**4. The URLs (`ProjectCore/urls.py`)**
Connect your views to the internet.
```python
from django.contrib import admin
from django.urls import path
from user_auth.views import signup, login

urlpatterns = [
    path('api/signup/', signup),
    path('api/login/', login),
]
```

### 🏃 Phase 4: Run It
```powershell
python manage.py runserver
```

**Pro Tip:** With DRF running, if you visit `http://127.0.0.1:8000/api/signup/` in your **Browser**, you won't see an error. You will see a beautiful web interface where you can actually type in JSON and test the API directly!
