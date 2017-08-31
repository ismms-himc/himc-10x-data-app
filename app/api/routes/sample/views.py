import flask
from flask import Blueprint

sample_blueprint = Blueprint('sample_pages', __name__)

@sample_blueprint.route('/samples', methods=['GET'])
# @cross_origin() # in Nick's hack; TODO: confirm CSRF protection works
def sample_index():
    # TODO: render a login/signup page if user not logged in; otherwise, render
    # the Samples Dashboard
    print("IN sample_index FUNCTION")
    return "<h1>These are the samples :) <h1>"