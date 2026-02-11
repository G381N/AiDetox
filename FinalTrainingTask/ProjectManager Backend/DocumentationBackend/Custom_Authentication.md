# 🔐 Custom Authentication Backend

This document details the logic within `auth_handler/backends.py`.

## Why did we need a custom backend?
Standard Django + SimpleJWT expects Users to be in a SQL database (handled by Django's ORM).
We are using **MongoDB** (handled by `mongoengine`).

SimpleJWT tries to look up users similarly to `User.objects.get(id=user_id)`. However, MongoEngine users are retrieved via `User.objects(id=user_id).first()`.
Because of this syntax and architectural difference, we had to write a "Bridge" that tells SimpleJWT how to find a MongoDB user.

## The Code Breakdown (`MongoJWTAuthentication`)

### Inheritance
 It inherits from `rest_framework_simplejwt.authentication.JWTAuthentication`.
```python
class MongoJWTAuthentication(JWTAuthentication):
    ...
```

### The `get_user` Method
This is the heart of the backend. It receives a `validated_token` (which SimpleJWT has already verified signature-wise) and must return a User object.

```python
    def get_user(self, validated_token):
        try:
            # 1. Extract the user_id from the token payload
            user_id = validated_token.get("user_id")

            # 2. Attempt to find this user in MongoDB
            user = User.objects(id=user_id).first()

            # 3. Validation
            if not user:
                raise AuthenticationFailed("User not found", code="user_not_found")

            # 4. Return the user object
            return user
            
        except Exception:
            raise AuthenticationFailed("Invalid token", code="invalid_token")
```

## How allow it to run?
In `settings.py`, we told DRF to use this class specifically:
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'auth_handler.backends.MongoJWTAuthentication',
    ),
}
```

## 🔗 [Back to Index](./Index.md)
