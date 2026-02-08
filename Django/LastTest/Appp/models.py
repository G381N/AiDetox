from mongoengine import Document, IntField, StringField, FloatField, BooleanField , ObjectIdField

class Menu(Document):
    _id =  ObjectIdField()
    fname=StringField(required=True,max_length=50)
    fnonveg=BooleanField(required=True)
    fprice=FloatField(required=True)
    fserves=IntField(required=True)

#  null =  False, blank = True, choices = []
#  ListField
#  DictField
#  ListField(DictField)

#  ReferenceField

#  EmbeddingDocument
#  EmbeddingField
