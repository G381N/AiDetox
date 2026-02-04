# 🗺️ Visual Backend Map

This document visualizes how your Django backend is wired together.

## 🏗️ The Building Blocks (File Structure)

Think of your project like a building. Here is what each implementation file does:

```text
📂 DjangoLearning (Project Root)
│
├── 📂 LearningAtempt1 (The "Headquarters")
│   ├── ⚙️ settings.py   → [THE BOSS] Configures apps and imports 'db.py' to start the connection.
│   ├── 🔌 db.py         → [THE CONNECTOR] Contains the credentials to connect to MongoDB Atlas.
│   └── 🚦 urls.py       → [THE GATEKEEPER] Decides where incoming requests go.
│
├── 📂 authService (The "Department" for Users)
│   ├── 📜 models.py     → [THE BLUEPRINT] Defines the "User" structure.
│   ├── 🧠 views.py      → [THE WORKER] The logic that processes Signup/Login.
│   └── 📍 urls.py       → [THE LOCAL GUIDE] Routes specific commands to the worker.
│
└── 🐍 manage.py         → [THE MANAGER] Command line tool to run the server.
```

---

## 🚀 The Journey of a Request

Here is the step-by-step path of a **Signup Request**:

1.  **Request `[USER] -> [URLS]`**
    The user sends data. `urls.py` sees `api/` and sends it to `authService`.

2.  **Routing `[URLS] -> [VIEWS]`**
    `authService/urls.py` sees `signup/` and wakes up the `signup` function in `views.py`.

3.  **Processing `[VIEWS] -> [MODELS]`**
    The view reads the email/password. It creates a new `User` object defined in `models.py`.

4.  **Database Action `[MODELS] -> [MONGODB]`**
    The model saves the data. It uses the connection that `db.py` established when the server started.

5.  **Response `[VIEWS] -> [USER]`**
    The view sends back "201 Created".

---

## 🧩 Corrected Connection Diagram

This diagram accurately shows that `db.py` sits on the side (handling the connection setup), while the data flows directly from your code to the database.

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
