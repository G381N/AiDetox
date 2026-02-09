from rest_framework_mongoengine.serializers import (
    DocumentSerializer,
    EmbeddedDocumentSerializer
)
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
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Expand category reference on READ
        if instance.category:
            data["category"] = {
                "id": str(instance.category.id),
                "name": instance.category.name
            }
        else:
            data["category"] = None

        return data
