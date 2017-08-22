# main entry point of application

import os
import sys
import json

import flask
from flask import request, Response

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

# TODO: below needed??
# from flask.ext.cors import cross_origin

# TODO: needed?
# Default config vals 
# THEME = 'default' if os.environ.get('THEME') is None else os.environ.get('THEME')
# FLASK_DEBUG = 'false' if os.environ.get('FLASK_DEBUG') is None else os.environ.get('FLASK_DEBUG')

# Create the Flask app
app = Flask(__name__)

app_settings = os.getenv(
    'APP_SETTINGS',
    'project.server.config.DevelopmentConfig'
)

app.config.from_object(app_settings)

app_settings = os.getenv(
    'APP_SETTINGS',
    'project.server.config.DevelopmentConfig'
)

# TODO: this is different than himc db. ok?
app.config.from_object(app_settings)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# TODO: implement this
# from project.server.auth.views import auth_blueprint
# app.register_blueprint(auth_blueprint)
