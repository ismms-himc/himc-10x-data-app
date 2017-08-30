# main entry point of application

import os
# import sys
# import json

# import flask
# from flask import request, Response

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from flask_wtf.csrf import CSRFProtect
# TODO: add this like here?: https://github.com/realpython/flask-jwt-auth/blob/master/project/server/__init__.py
# from flask_cors import CORS
# CORS(app)

# TODO: below needed??
# from flask.ext.cors import cross_origin

# TODO: needed?
# Default config vals 
# THEME = 'default' if os.environ.get('THEME') is None else os.environ.get('THEME')
# FLASK_DEBUG = 'false' if os.environ.get('FLASK_DEBUG') is None else os.environ.get('FLASK_DEBUG')

# Create the Flask app
app = Flask(__name__)
# We enable CSRF protection globally as per http://flask-wtf.readthedocs.io/en/stable/csrf.html
csrf = CSRFProtect(app)

app_settings = os.getenv(
    'APP_SETTINGS',
    'app.config.DevelopmentConfig'
)

# TODO: this is different than himc db. ok?
app.config.from_object(app_settings)


#####################################################3
# FROM HIMC DB:

# # Default config vals
# THEME = 'default' if os.environ.get('THEME') is None else os.environ.get('THEME')
# FLASK_DEBUG = 'false' if os.environ.get('FLASK_DEBUG') is None else os.environ.get('FLASK_DEBUG')

# # Load config values specified above
# app.config.from_object(__name__)

# # Load configuration vals from a file
# app.config.from_envvar('APP_CONFIG', silent=True)

#########################################33

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# TODO: make this work; look at home_page_bluprint in root/views for reference
from app.api.routes.auth.views import auth_blueprint
app.register_blueprint(auth_blueprint)
# site.routes.mod
from app.api.routes.root.views import home_page_blueprint
app.register_blueprint(home_page_blueprint)