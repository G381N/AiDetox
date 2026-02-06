from django.urls import path
from .views import MainHandler

urlpatterns = [
    path("main/", MainHandler.as_view()),
]