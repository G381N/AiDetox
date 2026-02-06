from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Bike
from mongoengine.errors import ValidationError as MongoValidationError
from .serializers import BikeSerializer


class BikeCRUDHandler(APIView):

    def get(self,request):
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)

# Open Postman and create a new request.
#    - Method: GET
#    - URL: http://localhost:8000/api/bikes/  # adjust path if your URL differs


    def post(self, request):
        serializer = BikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
# Open Postman and create a new request.
#    - Method: POST
#    - URL: http://localhost:8000/api/bikes/  # adjust path if your URL differs
#    - Headers:
#        Content-Type: application/json
#    - Body -> raw (JSON):
#      {
#        "bikename": "Duke 390",
#        "bikecc": 373,
#        "bikecategory": "Naked",
#        "bikeprice": 295000
#      }

    def patch(self, request):
        bike_id = request.query_params.get('id')

        if not bike_id:
            return Response({'error': 'Pass the bike id as a query param, e.g. ?id=...'}, status=400)

        try:
            bike = Bike.objects.get(id=bike_id)
        except (Bike.DoesNotExist, MongoValidationError):
            return Response({'error': 'Bike not found or invalid id'}, status=404)

        serializer = BikeSerializer(bike, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# 2. Open Postman and create a new request.
#    - Method: PATCH
#    - URL: http://localhost:8000/api/bikes/?id=65a3f1c2e4b0a1d2c3f4e5a6
#      (paste the actual id you copied from the GET response)
#    - Headers:
#        Content-Type: application/json
#    - Body -> raw (JSON) — only include the fields you want to update:
#      {
#        "bikeprice": 300000
#      }
# 3. Click "Send" — expected status: 200 OK with the updated bike object.