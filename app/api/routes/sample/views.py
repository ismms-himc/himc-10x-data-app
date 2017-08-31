import flask
from flask import request, Blueprint
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

    if 'q' in request.args:
    	# perform search using list comprehensions
    	query_string = request.args['q']
    	# we make the search case-insensitive
    	data_for_response = [x for x in sample_data if query_string.lower() in x['sample_id'].lower()]
    else:
    	# TODO: Return only the requested # of items
    	data_for_response = sample_data[:10]

    print("Sample Data:")
    print(data_for_response)
    print("\n")
    print("<h1> Samples Index </h1>")
    response = flask.Response(json.dumps(data_for_response))
    response.headers.add('X-Total-Count', len(data_for_response))
    response.headers.add('Access-Control-Expose-Headers', 'X-Total-Count')
    print("RESPONSE:")
    print(response)
    # import pdb; pdb.set_trace()
    return(response)