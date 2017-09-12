# main entry point of application

import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

# Create the Flask app
app = Flask(__name__, static_folder='app/api/static')

app_settings = os.getenv(
    'APP_SETTINGS',
    'app.config.DevelopmentConfig'
)

app.config.from_object(app_settings)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
