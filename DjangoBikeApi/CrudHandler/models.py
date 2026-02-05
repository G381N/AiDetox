from mongoengine import Document, StringField, IntField, FloatField

class Bike(Document):
    bikename = StringField(required=True, max_length=100)
    bikecc = IntField(required=True)
    bikecategory = StringField(required=True, max_length=50)
    bikeprice = FloatField(required=True)