from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Bike
from .serializers import BikeSerializer


class BikeCRUDHandler(APIView):

    def get(self,request):
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)
    
# Example JSON response for GET request:
# [
#   {
#     "id": 1,
#     "bikename": "Duke 390",
#     "bikecc": 373,
#     "bikecategory": "Naked",
#     "bikeprice": 295000
#   },
#   {
#     "id": 2,
#     "bikename": "CBR 250R",
#     "bikecc": 249,
#     "bikecategory": "Sport",
#     "bikeprice": 180000
#   }
# ]

    def post(self, request):
        serializer = BikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
#  Example JSON for POST request:
#      {
#       "bikename":"Duke 390"
#       "bikecc":373
#       "bikecategory":"Naked"
#       "bikeprice":295000
#      }


    def patch(self,request):
        bike_id = request.data.get('id')
        try:
            bike = Bike.objects.get(id=bike_id)
        except Bike.DoesNotExist:
            return Response({'error': 'Bike not found'}, status=404)
        
        serializer = BikeSerializer(bike, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# Example JSON for PATCH request:
# Request body (partial update):
# {
#   "id": 1,
#   "bikeprice": 300000
# }
#
# Example JSON response after successful PATCH:
# {
#   "id": 1,
#   "bikename": "Duke 390",
#   "bikecc": 373,
#   "bikecategory": "Naked",
#   "bikeprice": 300000
# }