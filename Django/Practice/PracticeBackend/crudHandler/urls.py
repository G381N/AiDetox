from django.urls import path
from .views import PracticeCrudHandler

urlpatterns = [
    path("practice/", PracticeCrudHandler.as_view()),
]