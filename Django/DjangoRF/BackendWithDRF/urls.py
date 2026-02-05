from django.urls import path
from AuthServiceDrfApp.views import signup, login

urlpatterns = [
    path('api/signup/', signup),
    path('api/login/', login),
]