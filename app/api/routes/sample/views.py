import flask
from flask import Blueprint
from app.api.models.sample import Sample
import json

sample_blueprint = Blueprint('sample_pages', __name__)

@sample_blueprint.route('/samples', methods=['GET'])
# @cross_origin() # in Nick's hack; TODO: confirm CSRF protection works
# TODO: only show samples that belong to logged in user
# Returns all samples belonging to logged in user. HIMC staff will have access
# to all samples.
def get_samples():
    samples = Sample.query.all()
    # TODO: better way to do this than sending array of json objects to frontend?
    # maybe by changing the restClient in App.js?
    # TODO: deal with when user filters search or only want to return requested # of items
    sample_data = []
    for sample in samples:
    	# TODO: eventually modify this to send S3 info needed
    	sample_data.append({ "sample_id": sample.sample_id })

    print(sample_data)
    print("<h1> Samples Index </h1>")
    response = flask.Response(json.dumps(sample_data))
    response.headers.add('X-Total-Count', len(sample_data))
    response.headers.add('Access-Control-Expose-Headers', 'X-Total-Count')

    return(response)