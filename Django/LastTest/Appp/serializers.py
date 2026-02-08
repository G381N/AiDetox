from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import Menu

class FoodSerializer(DocumentSerializer):
    class Meta:
        model = Menu
        field = '__all__'