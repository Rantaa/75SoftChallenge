from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
import redis

load_dotenv()

app = Flask(__name__)
#CORS(app, supports_credentials=True)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)

app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Necessary for cross-site or cross-origin requests
app.config['SESSION_COOKIE_SECURE'] = False # Only use True if your environment uses HTTPS
app.config['SESSION_COOKIE_PATH'] = '/'
app.config['CORS_HEADERS'] = 'Content-Type'

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase75soft.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["SESSION_TYPE"] = "redis"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379")

db = SQLAlchemy(app)
