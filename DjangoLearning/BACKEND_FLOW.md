# 🗺️ Visual Backend Map

This document visualizes how your Django backend is wired together.

## 🏗️ The Building Blocks (File Structure)

Think of your project like a building. Here is what each implementation file does:

```text
📂 DjangoLearning (Project Root)
│
├── 📂 LearningAtempt1 (The "Headquarters")
│   ├── ⚙️ settings.py   → [THE BOSS] Configures apps, security, and starts DB connection.
│   ├── 🔌 db.py         → [THE PLUG] Connects the app to MongoDB Atlas.
│   └── 🚦 urls.py       → [THE GATEKEEPER] Decides where incoming requests go.
│
├── 📂 authService (The "Department" for Users)
│   ├── 📜 models.py     → [THE BLUEPRINT] Defines what a "User" data looks like.
│   ├── 🧠 views.py      → [THE WORKER] The code that actually signs you up or logs you in.
│   └── 📍 urls.py       → [THE LOCAL GUIDE] Routes specific commands (like /login) to the worker.
│
└── 🐍 manage.py         → [THE MANAGER] Command line tool to run the server.
```

---

## 🚀 The Journey of a Request

Imagine a user clicks "Sign Up". Here is the exact path the data travels:

### Step 1: Arrival 📨
**User** sends data: `{"email": "me@test.com", "password": "123"}`
⬇️
**`LearningAtempt1/urls.py`** (The Gatekeeper)
*   *sees "api/" prefix*
*   *says: "Go to the Auth Department"*

### Step 2: Routing 🚏
⬇️
**`authService/urls.py`** (The Local Guide)
*   *sees "signup/"*
*   *says: "Hey `views.signup`, this is for you!"*

### Step 3: Processing ⚙️
⬇️
**`authService/views.py`** (The Worker)
1.  **Read**: Opens the packet (JSON).
2.  **Check**: Asks "Does this user exist?"
3.  **Secure**: Hashes "123" into `pbkdf2:sha256...` (so it's safe).
4.  **Save**: Tells the Model to save it.

### Step 4: Storage 💾
⬇️
**`authService/models.py`** (The Blueprint)
*   *Validates the data format.*
*   *Uses `db.py` connection to talk to the cloud.*
⬇️
**☁️ MongoDB Atlas** (The Vault)
*   *Data is permanently stored.*

### Step 5: Response ✅
⬇️
**`views.py`** returns: `"201 Created"`
⬇️
**User** sees: "Account Created Successfully!"

---

## 🧩 Connection Diagram

This simple chart shows who talks to whom:

```text
[ USER ]
    │
    ▼
[ URLS.PY ] ──checks path──┐
                           │
                ┌──────────▼──────────┐
                │   VIEWS.PY (Logic)  │
                └──────────┬──────────┘
                           │
           (creates)       │      (uses connection)
           ▼               ▼               ▼
    [ MODELS.PY ] ──── [ DB.PY ] ──── [ MONGODB ]
```
