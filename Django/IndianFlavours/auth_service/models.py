from mongoengine import Document, StringField, DateField, EmailField
from DateField import datetime

class User(Document):
    email         = EmailField(required=True,unique=True)
    username      = StringField(required=True,unique=True) 
    password      = StringField(required=True,min_length=10)
    role          = StringField(choices=["USER,ADMIN"],default="USER")
    createdAt     = DateTimeField(default=datetime.istnow)

    meta = {
        "db_alias" : "auth_db", #
        "collection" : "users"
    } 