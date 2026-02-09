from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from auth_service.models import User
from auth_service.serializer import UserSerializer
from auth_service.security import  hash_password
from auth_service.security import verify_password

@api_view(["POST"])
def register(request):
    request_recieved_email = request.data.get("email")
    request_email          = request_recieved_email.lower() 
    request_username       = request.data.get("username")
    
    request_password       = request.data.get("password")
    request_conf_password  = request.data.get("conf_password")
    
    
    
    if not request_email or not request_username or not request_password or not request_conf_password:
        return Response(
            {"error":"All fields are Required..."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if request_password != request_conf_password:
        return Response(
            {"error":"Passwords do not match ..."},
            status=status.HTTP_400_BAD_REQUEST
        )  
    if User.objects(email=request_email).first():
        return Response(
            {"error":"email already has been used try different email ..."},
            status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects(username=request_username).first():
        return Response(
            {"error":"This usernmae has been used already try a different one ..."},
            status=status.HTTP_400_BAD_REQUEST    
        )   
    
    # all the conditions pass then save through Model User
    
    
    
    
    user = User(
        email = request_email,
        username = request_username,
        password = hash_password(request_password)
    ).save()
    
    return Response(
    {
        "message": "User created successfully  ...",
        "username": request_username,
        "email": request_email
    },
    status=status.HTTP_201_CREATED
)
    
    
#-----------------------------------------LOGIN----------------------------------------------    
@api_view(["POST"])
def login(request):
    request_username = request.data.get("username")
    request_password = request.data.get("password")

    if not request_username or not request_password:
        return Response(
            {"error": "Username/Email and password are required ..."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # username OR email login
    mayby_username_or_email = (
        User.objects(username=request_username).first()
        or User.objects(email=request_username.lower()).first()
    )

    if not mayby_username_or_email:
        return Response(
            {"error": "User does not exist ..."},
            status=status.HTTP_404_NOT_FOUND
        )

    if not verify_password(request_password, mayby_username_or_email.password):
        return Response(
            {"error": "Invalid password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(
        {
            "message": "Login successful ...",
            "username": user.username,
            "email": user.email
        },
        status=status.HTTP_200_OK
    )