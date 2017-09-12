import flask
from flask import Blueprint, render_template

home_page_blueprint = Blueprint('home_page', __name__)

@home_page_blueprint.route('/', methods=['GET'])
def root_page():
    return render_template('index.html')
