
$ python -m venv venv

$ source venv/Scripts/activate

$ pip install django djangorestframework mongoengine

$ pip list

$ django-admin startproject BikeApiBackend .

$ python manage.py startapp CrudHandler


Now go in to the settings folder of the project and then setting 
Basically the installed apps needs to be updated 

we basically add these 2 in the installed app section which is nothing but the rest framework and the app name that we created.

'rest_framework',  
'CrudHandler',

after this i went ahead to the Project Dir and in the bottom of the settings folder i added the below code for my django to connect to mongoDB and also it can be done by creating a folder called db.py as well.. 

//database name & connection string 
from mongoengine import connect
connect(
    db="bike_db",
    host="mongodb+srv://gebingeorge_db_user:GiEavpF6Lpv4morE@cluster0.vdafbjx.mongodb.net/"
)


after that you go ahead and type code in the model folder of the app and then code

from mongoengine Document, StringField, IntField, FloatField

class Bikes(Document):

    bikename=StringField(required=True,max_length=50)
    bikeclass=StringField(required=True,max_length=50)
    bikeCC=IntField(required=True)
    bikeprice=FloatField(required=True)

