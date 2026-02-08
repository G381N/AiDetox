# Django Bike API with MongoDB

## Setup

```bash
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install django djangorestframework mongoengine django-rest-framework-mongoengine
django-admin startproject BikeApiBackend .
python manage.py startapp CrudHandler
```

Explanation:
- `python -m venv venv`: create an isolated Python virtual environment named `venv`.
- `source venv/Scripts/activate`: activate the virtual environment (Windows path shown); this makes installed packages local to the env.
- `pip install ...`: install Django, DRF, MongoEngine, and the MongoEngine DRF bridge.
- `django-admin startproject...`: scaffold a new Django project in the current folder.
- `python manage.py startapp CrudHandler`: create a new Django app called `CrudHandler`.

## 1. Configure `settings.py`

Add to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'CrudHandler',
    'rest_framework',
    # ... default Django apps like 'django.contrib.admin', etc.
]
```

Explanation:
- `'rest_framework'`: enables Django REST Framework features (serializers, views, etc.).
- `'CrudHandler'`: registers your app so Django loads its models, views, and urls.

Add MongoDB connection at the bottom (or in a separate `db.py`):

```python
from mongoengine import connect

connect(
    db="bike_db",
    host="your-mongodb-connection-string"
)
```

Explanation:
- `from mongoengine import connect`: imports the connection helper from MongoEngine.
- `connect(...)`: establishes a connection to your MongoDB instance using the database name and connection string. Keep credentials out of VCS.

## 2. Create Model (`CrudHandler/models.py`)

```python
from mongoengine import Document, StringField, IntField, FloatField

class Bike(Document):
    bikename = StringField(required=True, max_length=100)
    bikecc = IntField(required=True)
    bikecategory = StringField(required=True, max_length=50)
    bikeprice = FloatField(required=True)
```

Explanation (line-by-line):
- `from mongoengine import ...`: import base Document and field types from MongoEngine.
- `class Bike(Document):`: define a MongoEngine document (equivalent to a collection schema).
- `bikename = StringField(...)`: string field for the bike name; `required=True` forces a value.
- `bikecc = IntField(...)`: integer field for engine CC.
- `bikecategory = StringField(...)`: category/class of the bike.
- `bikeprice = FloatField(...)`: numeric price field.

## 3. Create Serializer (`CrudHandler/serializers.py`)

```python
from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import Bike

class BikeSerializer(DocumentSerializer):
    class Meta:
        model = Bike
        fields = '__all__'
```

Explanation:
- `DocumentSerializer`: DRF-compatible serializer for MongoEngine `Document` objects.
- `model = Bike`: serializer will map all fields from the `Bike` document.
- `fields = '__all__'`: include every field on the model in API representation.

## 4. Create Views (`CrudHandler/views.py`)

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Bike
from .serializers import BikeSerializer

class BikeCRUDHandler(APIView):
    def get(self, request):
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = BikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def patch(self,request):
        Rid=Request.Data.get('id')
        MongoObj=Bike.object.get(id=Rid)
        serializer = BikeSerializer(MongoObj,data=Request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)       
```

Explanation (line-by-line):
- `from rest_framework.views import APIView`: base class for class-based API views.
- `from rest_framework.response import Response`: helper to return HTTP responses with data.
- `bikes = Bike.objects.all()`: fetch all Bike documents from MongoDB.
- `serializer = BikeSerializer(bikes, many=True)`: serialize multiple objects.
- `return Response(serializer.data)`: return serialized data as JSON.
- `serializer = BikeSerializer(data=request.data)`: create serializer instance from incoming JSON for validation.
- `serializer.is_valid() / serializer.save()`: validate and persist the document to MongoDB.

## 5. Configure URLs

`CrudHandler/urls.py`:

```python
from django.urls import path
from .views import BikeCRUDHandler

urlpatterns = [
    path("bikes/", BikeCRUDHandler.as_view()),
]
```

Explanation:
- `path("bikes/", ...)`: route requests under `/bikes/` to the handler view.

`BikeApiBackend/urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    path("api/", include("CrudHandler.urls")),
]
```

Explanation:
- `path("api/", include(...))`: mount the app's URLs under the `/api/` prefix, so endpoints become `/api/bikes/`.

## 6. Run Server

```bash
python manage.py runserver
```

Explanation:
- `python manage.py runserver`: start Django's development server (default http://127.0.0.1:8000).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bikes/` | List all bikes |
| POST | `/api/bikes/` | Create a new bike |

Explanation:
- `GET /api/bikes/`: returns JSON array of bikes.
- `POST /api/bikes/`: accepts JSON body matching `BikeSerializer` fields to create a bike.



