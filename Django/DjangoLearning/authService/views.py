# authService/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User

# @csrf_exempt: This tells Django "Don't ask for a security token key for this specific function".
# We need this because our external Frontend (Vue.js) doesn't have that key yet.
@csrf_exempt
def signup(request):
    # 1. Check if the request method is POST (we only want to receive data, not give it yet)
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    # 2. Parse the data: Turn the "body" of the request (JSON string) into a Python dictionary
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    # 3. Validation: Make sure both fields are actually there
    if not email or not password:
        return JsonResponse({"error": "Missing email or password"}, status=400)

    # 4. Check for duplicates: Ask the Database "Do we already have a user with this email?"
    # User.objects(...) is how we talk to MongoDB
    if User.objects(email=email).first():
        return JsonResponse({"error": "User already exists"}, status=409)

    # 5. Create the User: Make a new 'User' object in memory
    user = User(email=email)
    
    # 6. Secure the Password: NEVER save raw passwords. This function turns "123" into "pbkdf2:sha256..."
    user.set_password(password)
    
    # 7. Save to DB: This actually writes the data to MongoDB Atlas
    user.save()

    # 8. Success: Tell the frontend "We did it!" (201 means Created)
    return JsonResponse({"message": "User created"}, status=201)


@csrf_exempt
def login(request):
    # 1. Check method again
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    # 2. Get the email/password the user typed
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    # 3. Search DB: Try to find a user with this email
    user = User.objects(email=email).first()

    # 4. User not found? Stop here.
    if not user:
        return JsonResponse({"error": "User not found"}, status=404)

    # 5. Check Password: Compare the password they typed with the scrambled one in the DB.
    # We use a special function because we can't just say 'if "123" == "scrambledhash"'
    if not user.check_password(password):
        return JsonResponse({"error": "Invalid password"}, status=401)

    # 6. Success: If we get here, everything is correct.
    return JsonResponse({"message": "Login successful"}, status=200)
