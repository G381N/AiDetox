from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from menu_service.models import Menu, Category
from menu_service.serializer import MenuSerializer, CategorySerializer

class MenuView(APIView):

    # GET function 
    def get(self, request):
        request_id_for_menu = request.GET.get("id")
        
        if request_id_for_menu:
            extracted_menu_object = Menu.objects(id=request_id_for_menu).first()
            if not extracted_menu_object:
                return Response(
                    {"error": "This menu item is not found ..."},
                    status=status.HTTP_404_NOT_FOUND
                )
            return Response(MenuSerializer(extracted_menu_object).data)
        
        # Return all menus if no ID provided
        menus = Menu.objects.all()
        return Response(MenuSerializer(menus, many=True).data)
        
    # POST function   
    def post(self,request):
        serialized_request_data = MenuSerializer(data=request.data)

        # If there is nothing inn the Request body then ...
        if not serialized_request_data.is_valid():
            return Response(
                serialized_request_data.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # If there is no issues, all fields are filled and valid then save ...
        serialized_request_data.save()
        return Response(
            serialized_request_data.data,
            status=status.HTTP_201_CREATED
        )    
        
    def patch(self,request):
        id_from_request = request.data.get("id")
        if not id_from_request:
            return Response(
                {"error": "There was no id in the payload ..."},
                status=status.HTTP_400_BAD_REQUEST
            )
        object_from_menu=Menu.objects(id=id_from_request).first()
        if not object_from_menu:
            return Response(
                {"error": "There was no object with that ID ..."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serialized_object_from_menu = MenuSerializer(object_from_menu,data=request.data,partial=True)
        
        if not serialized_object_from_menu.is_valid():
            return Response(
                serialized_object_from_menu.errors,
      
                status=status.HTTP_400_BAD_REQUEST
            ) 
        serialized_object_from_menu.save()
        return Response(serialized_object_from_menu.data)   
                
class CategoryView(APIView):
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        categories = Category.objects.all()
        return Response(CategorySerializer(categories, many=True).data)
                