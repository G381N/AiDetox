# 🎫 JWT Authentication — How It Works

## What is JWT?

**J**SON **W**eb **T**oken is a way to prove a user is logged in **without** storing session data on the server. It's **stateless** — every request carries its own proof of identity.

Think of it like a **digital badge**: after you log in, the server gives you a signed badge. Every time you make a request, you show this badge. The server verifies the signature and trusts it.

---

## JWT vs Sessions

| Feature | Sessions (Traditional) | JWT (What we use) |
|---------|----------------------|-------------------|
| Server storage | ✅ Server stores session data | ❌ Server stores nothing |
| Scalability | Hard (sessions tied to one server) | Easy (stateless, any server can verify) |
| How identity is sent | Cookie with session ID | `Authorization: Bearer <token>` header |
| When it expires | Server-side control | Token has built-in expiry |
| Best for | Server-rendered pages | REST APIs (frontend ↔ backend) |

---

## Structure of a JWT

A JWT looks like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJjMTIzIiwiZXhwIjoxNjk5MDAwMDAwfQ.abc123signature
```

It's three parts separated by dots:

```
HEADER.PAYLOAD.SIGNATURE
```

### 1. Header — Algorithm info
```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### 2. Payload — The actual data
```json
{
    "user_id": "abc123",
    "exp": 1699000000,
    "token_type": "access"
}
```

### 3. Signature — Verification hash
```
HMACSHA256(
    base64(header) + "." + base64(payload),
    SECRET_KEY
)
```

The server signs the token with `SECRET_KEY`. If anyone tampers with the payload, the signature won't match → the token is rejected.

---

## Two Types of Tokens

### Access Token
- **Short-lived** — 30 minutes (configured in `settings.py`)
- **Used for:** Every API request
- **Sent as:** `Authorization: Bearer <access_token>`

### Refresh Token
- **Long-lived** — 7 days
- **Used for:** Getting a new Access Token when the old one expires
- **Sent to:** A special refresh endpoint

```python
# In settings.py:
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

---

## The Authentication Flow

### Step 1: Login — Get Your Tokens

```
Client → POST /api/auth/login/
Body: {"first_credential": "john@email.com", "password": "secret"}

Server:
  1. Find user by email
  2. Verify password hash
  3. Generate access + refresh tokens
  4. Return both tokens

Response:
{
    "user": {"id": "...", "username": "john", ...},
    "access": "eyJhbGci...",
    "refresh": "eyJhbGci..."
}
```

### Step 2: Use the Access Token — Make Requests

```
Client → GET /api/projects/
Headers: {"Authorization": "Bearer eyJhbGci..."}

Server:
  1. MongoJWTAuthentication intercepts the request
  2. Extracts the token from the header
  3. Verifies the signature using SECRET_KEY
  4. Reads user_id from the payload
  5. Fetches the User from MongoDB
  6. Sets request.user = that User
  7. The View runs normally
```

### Step 3: Token Expires — Refresh It

```
Client → POST /api/auth/token/refresh/
Body: {"refresh": "eyJhbGci..."}

Server:
  1. Verifies the refresh token
  2. Generates a NEW access token
  3. Returns it

Response:
{
    "access": "eyJhbGci..."  (new token, good for 30 more minutes)
}
```

---

## Why We Need a Custom Backend

SimpleJWT is designed for Django's **SQL ORM** (`User.objects.get(id=user_id)`).

We use **MongoEngine** (`User.objects(id=user_id).first()`).

The syntax is different, so we wrote `MongoJWTAuthentication` to bridge the gap:

```python
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from auth_handler.models import User

class MongoJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id")
        if not user_id:
            raise AuthenticationFailed("Token contained no user identification")

        user = User.objects(id=user_id).first()  # MongoEngine syntax
        if user is None:
            raise AuthenticationFailed("User not found for given token")

        return user
```

And we tell DRF to use this backend in `settings.py`:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'auth_handler.backends.MongoJWTAuthentication',
    ),
}
```

> 📖 See **[My Project → Auth Module](../my_project/steps_auth_module.md)** for the full implementation.

---

## Token Storage (Frontend)

Where should the frontend store JWTs?

| Method | Security | Ease |
|--------|----------|------|
| `HttpOnly Cookie` | ✅ Most secure (JS can't access) | Harder to set up |
| `localStorage` | ⚠️ Vulnerable to XSS attacks | Easy to implement |
| `sessionStorage` | ⚠️ Vulnerable to XSS, lost on tab close | Easy |

---

## Generating Tokens in Code

In our views, we use SimpleJWT's `RefreshToken`:

```python
from rest_framework_simplejwt.tokens import RefreshToken

# Generate tokens for a user
refresh = RefreshToken.for_user(user)

access_token = str(refresh.access_token)  # Short-lived
refresh_token = str(refresh)               # Long-lived
```

---

## 🔗 Navigation

← **[Previous: MongoEngine Field Types](./mongoengine_fields.md)**

← **[Back to Learning Django](../learning_django.md)**

→ **Ready to build? Go to [My Django Project](../my_django_project.md)**
