from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from app import bcrypt, db
from app.api.models.user import User

auth_blueprint = Blueprint('auth', __name__)
