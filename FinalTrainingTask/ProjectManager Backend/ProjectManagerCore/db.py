from pathlib import Path
import os
from dotenv import load_dotenv
from mongoengine import connect

# Loading environment variables from the project .env file
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# Getting the MongoDB connection string from .env
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
if not CONNECTION_STRING:
    raise Exception("The Connection String is not set in the .env file. Set CONNECTION_STRING or MONGO_URI")

def init_db():
    # Connect auth DB (alias: auth_db)
    connect(db="project_manager_auth", alias="auth_db", host=CONNECTION_STRING)
    # Connect main project DB (alias: project_db)
    connect(db="project_manager", alias="project_db", host=CONNECTION_STRING)
# `os` is Python's standard library module for interacting with the operating system (env vars, paths, etc.).
