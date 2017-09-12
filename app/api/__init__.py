# main entry point of application
import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS

# Create the Flask app
app = Flask(__name__)

# TODO: add this like here?: https://github.com/realpython/flask-jwt-auth/blob/master/project/server/__init__.py
# Note: Adding the below helped overcome error: "No 'Access-Control-Allow-Origin' header is present on the requested resource."
CORS(app)

# We enable CSRF protection globally as per http://flask-wtf.readthedocs.io/en/stable/csrf.html
# TODO: confirm CRSRF protection works
csrf = CSRFProtect(app)

app_settings = os.getenv(
    'APP_SETTINGS',
    'app.config.DevelopmentConfig'
)

app.config.from_object(app_settings)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# TODO: make this work; look at home_page_bluprint in root/views for reference
from app.api.routes.auth.views import auth_blueprint
app.register_blueprint(auth_blueprint)
# site.routes.mod
from app.api.routes.root.views import home_page_blueprint
app.register_blueprint(home_page_blueprint)

from app.api.routes.sample.views import sample_blueprint
app.register_blueprint(sample_blueprint)

from flask import render_template

# We add the catch all route last so that our API routes have precedence. This
# catch-all route helps fix the routing bug. Users can now refresh while on /samples
# without getting a 404.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')
