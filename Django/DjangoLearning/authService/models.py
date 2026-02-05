from django.db import models
from mongoengine import Document, EmailField, StringField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    # this is for mongodb where the variables are defined as fields
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)

    def set_password(self, raw_password):
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)