from rest_framework_mongoengine.serializers import DocumentSerializer, EmbeddedDocumentSerializer
from menu_service.models import Menu, Review, Category
 
class ReviewSerializer(EmbeddedDocumentSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class CategorySerializer(DocumentSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class MenuSerializer(DocumentSerializer):
    reviews  = ReviewSerializer(many=True,required=True)
    category = CategorySerializer(required=True)
    
    class Meta:
        model     = Menu
        field     = "__all__"


