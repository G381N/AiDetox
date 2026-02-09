from mongoengine import Document, StringField, DateField
from DateField import datetime

class User(Document):
    username=StringField(required=True,unique=True)