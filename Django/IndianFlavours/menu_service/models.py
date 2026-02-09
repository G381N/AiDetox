from mongoengine import (
    Document, EmbeddedDocument,
    StringField, FloatField, BooleanField, IntField,
    ListField, DictField,
    ReferenceField, EmbeddedDocumentField,
    DateTimeField
)
from datetime import datetime
from mongoengine import NULLIFY


class Category(Document):
    name = StringField(required=True,unique=True)
    meta={
        "db_alias"   : "menu_db",
        "collection" : "categories"
    }       
    
class Review(EmbeddedDocument):
    username  = StringField(required=True)
    rating    = IntField(required=True,min_value=1,max_value=5)
    comment   = StringField(max_length=250)
    
    
class Menu(Document):
    fname     = StringField(required=True, max_length=50)
    fnonveg   = BooleanField(required=True)
    fprice    = FloatField(required=True)
    fserves   = IntField(required=True)
    tags      = ListField(StringField())                                               # Food Hashtags
    nutrition = DictField()                                                            # Nutrition Key and value pair 
    variants  = ListField(DictField())                                                 # Size/portion variants with price (e.g., small, medium, large)
    category  = ReferenceField(Category, reverse_delete_rule=NULLIFY, required=True)   # Reference to the food category (e.g., appetizer, main course)
    reviews   = ListField(EmbeddedDocumentField(Review))                               # List of customer reviews with ratings and comments
    createdAt = DateTimeField(default=datetime.utcnow)               

    meta = {
        "db_alias": "menu_db",
        "collection": "menu",
        "indexes": ["fname"]
    }
        
