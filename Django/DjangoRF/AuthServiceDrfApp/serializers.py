from rest_framework import serializers
# rest_framewor.mongoengine.serializers
class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)