from django.urls import path
from .views import BikeCRUDHandler

urlpatterns = [
    path("bikes/", BikeCRUDHandler.as_view()),
]
