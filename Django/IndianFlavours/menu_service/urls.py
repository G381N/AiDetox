from django.urls import path
from .views import MenuView, CategoryView

urlpatterns = [
    path("", MenuView.as_view()),                    # /api/menu/
    path("categories/", CategoryView.as_view()),    # /api/menu/categories/
]
