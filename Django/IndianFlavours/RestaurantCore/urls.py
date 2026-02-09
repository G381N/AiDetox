from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/", include("auth_service.urls")),
    path("api/menu/", include("menu_service.urls")),
]
