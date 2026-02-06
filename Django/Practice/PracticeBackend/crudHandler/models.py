from mongoengine import Document, IntField, StringField, EmailField

class PracticeModel(Document):
    name=StringField(required=True,max_length=30)
    cls=StringField(required=True,max_length=30)
    roll=IntField(required=True)
    email=EmailField(required=True)


    