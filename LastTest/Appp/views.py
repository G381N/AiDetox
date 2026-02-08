from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Menu
from .serializers import FoodSerializer
from rest_framework import status
class MainHandler(APIView):
    def get(self,request):
        data = request.GET
        if "id" in data:
            menu = Menu.objects.filter(_id = data['id']).first()
            return Response(FoodSerializer(menu).data)
        O = Menu.objects.all()
        S = FoodSerializer(O, many=True)
        return Response(S.data)
    def post(self,request):
        S = FoodSerializer(data=request.data)
        if S.is_valid():
            S.save()
            return Response(S.data, status=201)
        return Response(S.errors, status=400)
    def patch(self,request):
        Rid=request.data.get('id') # From Request saving the ID
        ModelID=Menu.objects.get(id=Rid) # From Mongo fetching object with ID of RID
        S=FoodSerializer(ModelID,data=request.data,partial=True) # Serializer has the existing MongoData, Change from RequestBody
        if S.is_valid():
            S.save() #Updating
            return Response(S.data,status=201) #Response with Success
        return Response(S.errors,status=400) #Response with Error
