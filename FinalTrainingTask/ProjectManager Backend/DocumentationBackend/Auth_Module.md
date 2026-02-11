# 🛠️ Authentication Module (`auth_handler`)

This module manages Users, Registration, and Logging in.

## 1. Models (`models.py`)
We define a **User** document extending `mongoengine.Document`.
*   **Fields**:
    *   `username` (String, unique)
    *   `email` (String, unique)
    *   `password` (String, hashed)
    *   `created_at` (DateTime)
*   **Methods**:
    *   `set_password(raw)`: Hashes password using Werkzeug.
    *   `check_password(raw)`: Verifies hash.
    *   `is_authenticated`: Property returning `True` (Critical for DRF).

## 2. Serializers (`serializers.py`)
*   **UserSerializer**: Read-only, formats user data for responses (hides password).
*   **RegisterSerializer**: Handles validation.
    *   Checks if passwords match.
    *   Checks if email/username is unique.
    *   Creates the user instance upon save.

## 3. Views (`views.py`)
*   **RegisterAPIView** (`POST`):
    1.  Validates input keys.
    2.  Checks duplicates.
    3.  Creates User.
    4.  Generates simpleJWT tokens explicitly `RefreshToken.for_user(user)`.
    5.  Returns User + Tokens.

*   **LoginAPIView** (`POST`):
    1.  Accepts `first_credential` (can be email OR username) & `password`.
    2.  Queries DB for user.
    3.  Checks password hash.
    4.  Generates/Returns Tokens.

## 4. URLs (`urls.py`)
*   `register/` mapped to `RegisterAPIView`
*   `login/` mapped to `LoginAPIView`

## 🔗 [Back to Index](./Index.md)
