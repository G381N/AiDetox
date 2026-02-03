# authService/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User

@csrf_exempt
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return JsonResponse({"error": "Missing email or password"}, status=400)

    if User.objects(email=email).first():
        return JsonResponse({"error": "User already exists"}, status=409)

    user = User(email=email)
    user.set_password(password)
    user.save()

    return JsonResponse({"message": "User created"}, status=201)


@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    user = User.objects(email=email).first()

    if not user:
        return JsonResponse({"error": "User not found"}, status=404)

    if not user.check_password(password):
        return JsonResponse({"error": "Invalid password"}, status=401)

    return JsonResponse({"message": "Login successful"}, status=200)
