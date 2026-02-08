from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import UserSerializer
from .model import User

class LoginHandler(APIView):
    def post(self, request):
        UsernameFromRequest = request.data.get('username')
        PasswordFromRequest = request.data.get('password')
        FromMongoDBuser = User.objects.filter(username=UsernameFromRequest).first()
        if FromMongoDBuser is not None and FromMongoDBuser.check_password(PasswordFromRequest):
            RefreshToken = RefreshToken.for_user(FromMongoDBuser)
            return Response({
                'refresh': str(RefreshToken),
                'access': str(RefreshToken.access_token)
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)