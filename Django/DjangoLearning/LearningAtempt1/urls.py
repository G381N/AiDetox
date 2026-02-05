# LearningAtempt1/urls.py
from django.urls import path, include

urlpatterns = [
    path("api/", include("authService.urls")),
]
