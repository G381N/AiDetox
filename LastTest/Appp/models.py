from mongoengine import Document, IntField, StringField, FloatField, BooleanField 

class Menu(Document):
    fname=StringField(required=True,max_length=50)
    fnonveg=BooleanField(required=True)
    fprice=FloatField(required=True)
    fserves=IntField(required=True)
