# 📘 Project Documentation

## 🗺️ Visual Backend Map

This document visualizes how your Django backend is wired together.

### 🏗️ The Building Blocks
Think of your project like a building. Here is what each implementation file does:

```text
📂 DjangoLearning (Project Root)
│
├── 📂 LearningAtempt1 (The "Headquarters")
│   ├── ⚙️ settings.py   → [THE BOSS] Configures apps and imports 'db.py'.
│   ├── 🔌 db.py         → [THE CONNECTOR] Contains the credentials to connect to MongoDB.
│   └── 🚦 urls.py       → [THE GATEKEEPER] Decides where incoming requests go.
│
├── 📂 authService (The "Department" for Users)
│   ├── 📜 models.py     → [THE BLUEPRINT] Defines the "User" structure.
│   ├── 🧠 views.py      → [THE WORKER] The logic that processes Signup/Login.
│   └── 📍 urls.py       → [THE LOCAL GUIDE] Routes specific commands to the worker.
│
└── 🐍 manage.py         → [THE MANAGER] Command line tool to run the server.
```

### 🧩 Connection Diagram
```text
      [ USER ]
         │
         │ (1. Request sent)
         ▼
    [ URLS.PY ]
         │
         │ (2. Routes request)
         ▼
    [ VIEWS.PY ] ──────(3. Uses)──────> [ MODELS.PY ]
         │                                    │
         │                                    │ (4. Saves Data)
    (5. Response)                             ▼
         │                            [ MONGODB ATLAS ]
         ▼                                    ▲
      [ USER ]                                │
                                              │ (Connection Setup)
                                              │
                                          [ DB.PY ]
                                     (Imported by Settings)
```

---

## 🧠 How `views.py` Works (For Dummies)

Think of `views.py` as a **Receptionist** at a hotel.

### 1. The Signup Process
Imagine a guest walking up to the desk to check in for the first time.
1.  **"POST Only"**: The receptionist says, "I only accept forms (POST), don't just ask me questions (GET)."
2.  **Unpack the Luggage (`json.loads`)**: The guest hands over a locked suitcase (the data). The receptionist opens it up to find the `Email` and `Password`.
3.  **Check the Book (`User.objects...first()`)**: The receptionists checks the guest book. "Wait, is this person already staying here?"
    *   *If yes:* "Sorry, you already have a room!" (Error 409).
4.  **Security (`set_password`)**: The guest whispers their password "123". The receptionist **scrambles it** into a secret code "x8z#9q..." before writing it down. **This is crucial.** We never write down the actual password.
5.  **Save (`save()`)**: The receptionist writes the details into the permanent ledger (MongoDB).

### 2. The Login Process
Imagine a guest coming back to their room.
1.  **Find the Guest**: The receptionist looks up the email in the book.
    *   *If name not found:* "We don't know you." (Error 404).
2.  **Check the Key (`check_password`)**: The guest says "123". The receptionist scambles it using the same method as before and checks if it matches the code written in the book.
    *   *Match?* "Welcome back!" (Success 200).
    *   *No Match?* "Wrong key!" (Error 401).

---

## 🛡️ What is CORS? (Safety for your App)

**CORS (Cross-Origin Resource Sharing)** is like a **Bouncer** at the door.

By default, web browsers are paranoid. If your website lives at `http://localhost:8080` (Frontend), and it tries to talk to `http://localhost:8000` (Backend), the browser yells **"STRANGER DANGER!"** because they are on different ports (origins).

We had to tell the Backend: **"It's okay, let the guy from port 8080 come in."**

### 📍 Where did we add this?
We did **NOT** do this in `views.py`. This is a global setting, so it lives in **`LearningAtempt1/settings.py`** ("The Boss").

We made 3 specific changes in `settings.py`:

1.  **Installed the App**:
    ```python
    INSTALLED_APPS = [
        ...
        'corsheaders',  # <--- We hired the bouncer
        ...
    ]
    ```

2.  **Added Middleware**:
    ```python
    MIDDLEWARE = [
        ...
        'corsheaders.middleware.CorsMiddleware', # <--- Put the bouncer at the front door
        'django.middleware.common.CommonMiddleware',
        ...
    ]
    ```

3.  **Allowed Everyone (For Dev)**:
    ```python
    CORS_ALLOW_ALL_ORIGINS = True  # <--- Told the bouncer "Let everyone in"
    ```
    *(Note: In a real production app, you would list specifically who is allowed, but for learning, this is perfect.)*
