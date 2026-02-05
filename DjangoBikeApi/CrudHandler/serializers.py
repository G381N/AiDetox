from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import Bike


class BikeSerializer(DocumentSerializer):
    class Meta:
        model = Bike
        fields = '__all__'
