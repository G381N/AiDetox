from pathlib import Path
import os
from dotenv import load_dotenv
from mongoengine import connect


BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

CONNECTION_STRING = os.getenv("CONNECTION_STRING") or os.getenv("MONGO_URI")
if not CONNECTION_STRING:
    raise Exception("The Connection String is not set in the .env file. Set CONNECTION_STRING or MONGO_URI")


def init_db():
    """Initialize MongoEngine connections with named aliases.

    This connects two logical databases (auth and project) to the same
    MongoDB deployment. Adjust DB names/aliases as needed.
    """
    # Auth DB
    connect(db="project_manager_auth", alias="auth_db", host=CONNECTION_STRING)
    # Main project DB
    connect(db="project_manager", alias="project_db", host=CONNECTION_STRING)
import mongoengine
from django.conf import settings

def init_db():
    """Initialize MongoEngine connection using settings.MONGO_URI"""
    mongoengine.connect(host=getattr(settings, 'MONGO_URI'))
