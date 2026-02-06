from rest_framework_mongoengine.serializers import DocumentSerializer 
from .models import PracticeModel

class PracticeSerializer(DocumentSerializer):
    class meta:
        model = PracticeModel
        field = '__all__'