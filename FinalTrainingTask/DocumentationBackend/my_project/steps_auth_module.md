# 🔐 Step 4: Auth Module (`auth_handler`)

Build the entire authentication system — User model, serializers, views, custom JWT backend, and URLs.

> **By the end of this step:** Working `/api/auth/register/` and `/api/auth/login/` endpoints returning JWT tokens.

---

## Files We'll Create

| File | Purpose |
|------|---------|
| `models.py` | User document with password hashing |
| `serializers.py` | Validation for registration |
| `views.py` | Register and Login endpoints |
| `backends.py` | Custom JWT authentication for MongoDB |
| `urls.py` | URL routing |

---

## 4.1 User Model (`models.py`)

> 📖 Prereq: [MongoEngine Fields](../learning/mongoengine_fields.md) | [Models, Views & URLs](../learning/models_views_urls.md)

```python
from mongoengine import Document, EmailField, StringField, DateTimeField
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(Document):
    meta = {"collection": "users", "db_alias": "auth_db"}

    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    @property
    def is_authenticated(self):
        return True

    def set_password(self, raw_password):
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)

    def to_safe_dict(self):
        return {
            "id": str(self.id),
            "username": getattr(self, "username", None),
            "email": self.email,
            "created_at": self.created_at,
        }
```

**Key points:**
- `meta["db_alias"]` → Uses the `auth_db` database connection from `db.py`
- `set_password()` → Hashes the raw password before storing
- `check_password()` → Compares raw password against the stored hash
- `@property is_authenticated` → DRF needs this to recognize the user as logged in

**Password flow:**
```
Register: raw_password → set_password() → generate_password_hash() → stored as hash
Login:    raw_password → check_password() → check_password_hash(stored, raw) → True/False
```

---

## 4.2 Serializers (`serializers.py`)

> 📖 Prereq: [Serializers Explained](../learning/serializers_explained.md)

```python
from rest_framework_mongoengine.serializers import DocumentSerializer
from auth_handler.models import User
from rest_framework.exceptions import ValidationError

# Read-only serializer for responses (hides password)
class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "created_at")


# Registration serializer with validation
class RegisterSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "created_at")
        read_only_fields = ("id", "created_at")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        pw = attrs.get("password")
        pwc = self.initial_data.get("password_confirm")
        if not pw or pw != pwc:
            raise ValidationError("Passwords do not match")
        return attrs

    def validate_email(self, value):
        if User.objects(email=value).first():
            raise ValidationError("This email is already registered")
        return value

    def validate_username(self, value):
        if User.objects(username=value).first():
            raise ValidationError("This username is already taken")
        return value

    def create(self, validated_data):
        validated_data.pop("password_confirm", None)
        raw_password = validated_data.pop("password", None)
        user = User(**validated_data)
        if raw_password:
            user.set_password(raw_password)
        user.save()
        return user
```

**What each method does:**
- `validate()` → Cross-field check: passwords must match
- `validate_email()` → Check email isn't already in the database
- `validate_username()` → Check username isn't already taken
- `create()` → Hash the password via model's `set_password()`, then save

> **Why `self.initial_data`?** `password_confirm` isn't a model field, it's not in validated `attrs`. `initial_data` gives access to the raw request.

---

## 4.3 Views (`views.py`)

> 📖 Prereq: [What is DRF?](../learning/what_is_drf.md)

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from auth_handler.models import User
from auth_handler.serializers import UserSerializer


def validate_keys(data, required_keys):
    """Check if all required keys are present. Returns 400 Response or None."""
    missing_keys = [key for key in required_keys if key not in data]
    if missing_keys:
        return Response(
            {"message": "There is a Missing Field ...", "missing_fields": missing_keys},
            status=status.HTTP_400_BAD_REQUEST,
        )
    return None
```

### RegisterAPIView

```python
class RegisterAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data or {}
        username = data.get("username", None)
        email = (data.get("email") or "").strip().lower()
        password = data.get("password", None)
        password_confirm = data.get("password_confirm", None)

        # Check required fields
        req = ("username", "email", "password", "password_confirm")
        missing_response = validate_keys(data, req)
        if missing_response:
            return missing_response

        # Validate
        if password != password_confirm:
            return Response({"detail": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects(username=username).first():
            return Response({"detail": "User with that username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects(email=email).first():
            return Response({"detail": "User with that email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User()
        try:
            user.username = username
            user.email = email
            user.set_password(password)
            user.save()
        except Exception:
            return Response({"detail": "Failed to create user"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "User Created Successfully ..."
        }, status=status.HTTP_201_CREATED)
```

### LoginAPIView

```python
class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data or {}

        req = ("first_credential", "password")
        missing_resp = validate_keys(data, req)
        if missing_resp:
            return missing_resp

        first_credential = (data.get("first_credential") or "").strip().lower()
        password = data.get("password")

        if not first_credential:
            return Response({"detail": "first_credential is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({"detail": "password is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Try email first, then username
        user = User.objects(email=first_credential).first()
        if not user:
            user = User.objects(username=first_credential).first()

        if not user or not user.check_password(password):
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)
```

> **Why `first_credential`?** Users can log in with **email OR username** — the view tries email first, then falls back to username.

---

## 4.4 Custom JWT Backend (`backends.py`)

> 📖 Prereq: [JWT Authentication](../learning/jwt_explained.md)

```python
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from auth_handler.models import User

class MongoJWTAuthentication(JWTAuthentication):
    user_id_claim = "user_id"

    def get_user(self, validated_token):
        user_id = validated_token.get(self.user_id_claim)
        if not user_id:
            raise AuthenticationFailed("Token contained no user identification")

        user = User.objects(id=user_id).first()
        if user is None:
            raise AuthenticationFailed("User not found for given token")

        return user
```

**Why needed?** SimpleJWT uses Django ORM syntax (`User.objects.get(id=...)`). We use MongoEngine syntax (`User.objects(id=...).first()`). This bridge fixes that mismatch.

---

## 4.5 URLs (`urls.py`)

```python
from django.urls import path
from auth_handler.views import RegisterAPIView, LoginAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="auth-register"),
    path("login/", LoginAPIView.as_view(), name="auth-login"),
]
```

## 4.6 Wire Into Core Router (`ProjectManagerCore/urls.py`)

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth_handler.urls')),
    path('api/projects/', include('project_handler.urls')),
]
```

---

## 4.7 Test It!

**Register:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@email.com","password":"secret123","password_confirm":"secret123"}'
```

**Login:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"first_credential":"john@email.com","password":"secret123"}'
```

---

## 🔗 Navigation

← **[Previous: Step 3 — Database Connection](./my_project_db.md)** · ← **[Back to My Django Project](../my_django_project.md)** · → **[Next: Step 5 — Project Module](./steps_project_module.md)**
