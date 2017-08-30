import flask
from flask import Blueprint

home_page_blueprint = Blueprint('home_page', __name__)

@home_page_blueprint.route('/', methods=['GET'])
# @cross_origin() # in Nick's hack; TODO: confirm CSRF protection works
def root_page():
    # TODO: render a login/signup page if user not logged in; otherwise, render
    # the Samples Dashboard
    print("IN ROOT_PAGE FUNCTION")
    return "<h1>HELLO WORLD <h1>"