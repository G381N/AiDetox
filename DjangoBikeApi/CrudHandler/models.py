from mongoengine import Document, StringField, IntField, FloatField

class Bike(Document):
    bike-name     : StringField(required=True, max_length=100)
    bike-cc       : IntField(required=True)
    bike-category : StringField(required=True, max_length=50)
    bike-price    : FloatField(required=True)