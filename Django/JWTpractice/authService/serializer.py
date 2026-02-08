from rest_framework_mongoengine.serializer import DocumentSerializer
from .model import User
class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = '__all__'