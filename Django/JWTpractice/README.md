
Step 1
pip install django mongoengine djangorestframework django-rest-framework-mongoengine djangorestframework-simplejwt


Step 2: Add this in Settings.py
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
]

Step3 : Add this in the bottom of Settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

Step4: Add this in urls.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

<!-- also add url patterns  -->

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]