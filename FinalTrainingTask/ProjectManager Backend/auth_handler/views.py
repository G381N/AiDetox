#Imports ive used before
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

#First time im using these imports for JWT
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

#These imports import the serializer and Model
from auth_handler.serializers import RegisterSerializer, UserSerializer
from auth_handler.models import User


# Register endpoint
class RegisterAPIView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        # `serializer` holds the RegisterSerializer instance with request data
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # create JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


# Login endpoint
class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            return Response({"detail": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

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
 
