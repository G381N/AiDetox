from pathlib import Path
import os
from dotenv import load_dotenv
from mongoengine import connect

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR/".env")
ATLAS_URL = os.getenv("CONNECTION_STRING")
if not ATLAS_URL:
    raise Exception("The Connection String is not set in the .env file.")

connect(
    db="flavours_auth_db",
    alias="auth_db",
    host=ATLAS_URL 
)

connect(
    db="flavours_menu_db",
    alias="menu_db",
    host=ATLAS_URL  
)