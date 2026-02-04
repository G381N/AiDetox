import requests
from mongoengine import connect, Document, EmailField, StringField
import sys

# 1. Define the model to match the existing database structure
class User(Document):
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    meta = {'collection': 'user'}  # Default mongoengine behavior for class User

# 2. Connect to the database directly
try:
    connect(
        db="auth_db",
        host="mongodb+srv://gebingeorge_db_user:GiEavpF6Lpv4morE@cluster0.vdafbjx.mongodb.net/",
        alias="default"
    )
    print("Successfully connected to MongoDB.")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    sys.exit(1)

# 3. Test the API Endpoints
BASE_URL = "http://127.0.0.1:8000/api"
TEST_EMAIL = "verification_test@example.com"
TEST_PASSWORD = "securepassword123"

# Clean up previous test run if exists
try:
    existing_user = User.objects(email=TEST_EMAIL).first()
    if existing_user:
        existing_user.delete()
        print(f"cleaned up existing user: {TEST_EMAIL}")
except Exception as e:
    print(f"Error during cleanup: {e}")

print(f"\nAttempting to create user via API: {TEST_EMAIL}")
try:
    response = requests.post(
        f"{BASE_URL}/signup/",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
    )
    
    print(f"API Response Code: {response.status_code}")
    print(f"API Response Body: {response.json()}")
    
    if response.status_code in [201, 200]:
        print("API reported success.")
    else:
        print("API reported failure.")

except Exception as e:
    print(f"Failed to contact API: {e}")
    print("Ensure the Django server is running on port 8000.")

# 4. Verify directly in MongoDB
print(f"\nVerifying directly in MongoDB for user: {TEST_EMAIL}")
found_user = User.objects(email=TEST_EMAIL).first()

if found_user:
    print(f"SUCCESS: User '{found_user.email}' was found in the MongoDB 'user' collection!")
    print(f"User ID: {found_user.id}")
else:
    print(f"FAILURE: User '{TEST_EMAIL}' was NOT found in MongoDB.")
