from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from app import app, bcrypt, db
from app.api.models.user import User


from flask_cors import cross_origin


@app.route('/')
# @cross_origin() # in Nick's hack; TODO: confirm CSRF protection works
@cross_origin()
def react_page():
    return flask.render_template('react-page.html')