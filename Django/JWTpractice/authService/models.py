from mongoengine import Document, StringField, EmailField, PasswordField, DateTimeField
class User(Document):
    username = StringField(Required=True, unique=True)
    email = EmailField(Required=True, uniqu=True)
    password = PasswordField(Required=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)