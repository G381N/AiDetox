# 📘 DjangoFrontend Architecture

This document explains the architecture of the Vue.js + Django integration for the **AiDetox** project.

---

## 🏗️ Project Structure

This project follows a component-based architecture for the UI and a modular pattern for API communication.

```text
📂 DjangoFrontend (Project Root)
│
├── 📂 src
│   ├── 🏫 App.vue             → [THE CONDUCTOR] Manages global state (e.g., Auth State).
│   ├── 📂 components          → [UI BLOCKS] Reusable interface elements.
│   │   ├── 📝 UserAuth.vue    → Handles Login & Signup forms + Validation.
│   │   └── 📊 UserDashboard.vue → shown after successful login.
│   │
│   ├── 📂 api                 → [DATA LAYER] Handles backend communication.
│   │   ├── 📨 auth.js         → Specific methods for Auth (Login/Signup).
│   │   └── 🚚 client.js       → Centralized Axios configuration (Base URL).
│   │
│   └── 📂 assets              → [STYLING]
│       └── 🎨 custom.css      → Modern glassmorphism & gradient styles.
│
└── 🐍 manage.py               → (Django Backend lives separately on port 8000)
```

---

## 🔄 How It Works (The Data Flow)

### 1. The Interaction
When a user clicks **"Login"** in `UserAuth.vue`:
- The component gathers the email and password.
- It validates inputs (e.g., ensures fields aren't empty).

### 2. The API Call
The component delegates the heavy lifting to the `api` folder:
- `UserAuth.vue` calls `auth.login(credentials)`.
- `auth.js` uses `client.js` to send a **POST** request.

### 3. The Backend Communication
- **Request**: POST `http://127.0.0.1:8000/api/login/`
- **Frontend URL**: `client.js` defines the base `http://127.0.0.1:8000/api`.
- **Headers**: Automatically sets `Content-Type: application/json`.

### 4. The Response
- **Success**: The component emits an event (`auth-success`) to `App.vue`, which flips the view to the Dashboard.
- **Error**: The component catches the error and displays a **red Bootstrap alert**.

---

## 🛠️ Key Technologies

- **Vue.js 2**: The progressive JavaScript framework.
- **BootstrapVue**: Provides the grid system, cards, forms, and alerts.
- **Axios**: Handles HTTP requests to the Django backend.
- **CSS3**: Custom gradients and transitions (`custom.css`).

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run serve
    ```

3.  **View App**:
    Open [http://localhost:8080](http://localhost:8080) to see the frontend.
