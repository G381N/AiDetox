# 🎫 JWT Logic (JSON Web Tokens)

This document explains the concept of JWT and how it is implemented in this specific project.

## 🧠 What is a JWT?
**J**SON **W**eb **T**oken is a standard method for representing claims securely between two parties.
In our context, it serves as a "Digital Badge" that a user carries to prove they are logged in.

### Structure of a JWT
A token string `xxxxx.yyyyy.zzzzz` has 3 parts:
1.  **Header**: Algorithm & Token Type.
2.  **Payload**: Data (User ID, Expiry time, etc.).
3.  **Signature**: A verification hash signed with our `SECRET_KEY`.

---

## 🔄 The Authentication Flow

### 1. Login (Obtaining the Badge)
1.  User posts `username` & `password` to `/api/auth/login/`.
2.  Server verifies credentials against MongoDB.
3.  If correct, Server generates two tokens:
    *   **Access Token**: Short-lived (30 mins). Used for API requests.
    *   **Refresh Token**: Long-lived (7 days). Used to get a new Access Token when the old one expires.
4.  Server sends these tokens back to the client (JSON response).

### 2. Making Requests (Using the Badge)
1.  Client wants to create a Project (`POST /api/projects/`).
2.  Client adds a Header to the HTTP Request:
    `Authorization: Bearer <ACCESS_TOKEN_STRING>`
3.  Server receives request. `MongoJWTAuthentication` intercepts it.
4.  Server verifies the **Signature** using `SECRET_KEY`.
5.  Server reads the `user_id` from the **Payload**.
6.  Server fetches the User from MongoDB.
7.  If successful, the request is allowed to proceed to the View.

---

## 🛠️ Implementation Details

*   **Library**: `djangorestframework-simplejwt` does the heavy lifting (generation, signing, verification).
*   **Customization**: We only customized the *User Lookup* part (in `backends.py`) because of MongoDB.
*   **Storage**: On the client side, these tokens should ideally be stored in `HttpOnly Cookies` (most secure) or `localStorage` (easier, but less secure).

## 🔗 [Back to Index](./Index.md)
