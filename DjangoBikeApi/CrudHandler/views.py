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
    
    def post(self, request):
        serializer = BikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    