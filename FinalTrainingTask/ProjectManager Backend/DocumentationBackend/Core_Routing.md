# 🔗 Core Routing (`ProjectManagerCore/urls.py`)

This file is the **Traffic Controller** of the entire Django application.
It receives every request first and decides which "App" should handle it.

## The Code

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 1. Admin Interface (Disabled/Not used for MongoEngine usually)
    path('admin/', admin.site.urls),

    # 2. Authentication Routes
    # Forwards anything starting with 'api/auth/' to auth_handler.urls
    path('api/auth/', include('auth_handler.urls')),

    # 3. Project/Task Routes
    # Forwards anything starting with 'api/projects/' to project_handler.urls
    path('api/projects/', include('project_handler.urls')),
]
```

## How it works
1.  **Request**: `GET /api/auth/login/`
2.  **Match**: Matches `api/auth/` prefix.
3.  **Forward**: User is sent to `auth_handler/urls.py`.
4.  **Final Match**: Inside `auth_handler`, it matches `login/`.
5.  **View**: `LoginAPIView` is called.

## 🔗 [Back to Index](./Index.md)
