from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from auth_handler.models import User
from auth_handler.serializers import UserSerializer


def validate_keys(data, required_keys):
    missing_keys = [key for key in required_keys if key not in data]
    if missing_keys:
        return Response(
            {
                "message": "There is a Missing Field ...",
                "missing_fields": missing_keys,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    return None

#Register a new user and return JWT tokens.

class RegisterAPIView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        # Variables---------------------------------------------------------------------------------------------------
        data = request.data or {}
        username = data.get("username", None)
        email = (data.get("email") or "").strip().lower()
        password = data.get("password", None)
        password_confirm = data.get("password_confirm", None)
        # Checking if any field is empty------------------------------------------------------------------------------
        req = ("username", "email", "password", "password_confirm") #RequiredList
        missing_response = validate_keys(data, req)
        # if there is any field missing missing_response wont be empty and will print the response
        if missing_response:
            return missing_response
        # Other validations--------------------------------------------------------------------------------------------
        if password != password_confirm:
            return Response({"detail": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects(username=username).first():
            return Response({"detail": "User with that username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects(email=email).first():
            return Response({"detail": "User with that email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        # all validations passed now we create user object and save once-----------------------------------------------
        user = User()
        try:
            user.username = username
            user.email = email
            user.set_password(password)
            user.save()
        except Exception:
            return Response({"detail": "Failed to create user"}, status=status.HTTP_400_BAD_REQUEST)
        # JWT is getting created---------------------------------------------------------------------------------------
        refresh = RefreshToken.for_user(user)
        response ={}
        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "message":"User Created Succesfully ..."
            },
            status=status.HTTP_201_CREATED,
        )


class LoginAPIView(APIView):
    """Authenticate user and return JWT tokens."""

    permission_classes = (AllowAny,)

    def post(self, request):
        # normalize input (trim strings)
        raw = request.data or {}
        data = {k: (v.strip() if isinstance(v, str) else v) for k, v in raw.items()}

        # required keys check
        req = ("email", "password")
        missing_resp = validate_keys(data, req)
        if missing_resp:
            return missing_resp

        email = (data.get("email") or "").strip().lower()
        password = data.get("password")

        # empty value checks
        if not email:
            return Response({"detail": "email is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({"detail": "password is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects(email=email).first()
        if not user or not user.check_password(password):
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )
 
