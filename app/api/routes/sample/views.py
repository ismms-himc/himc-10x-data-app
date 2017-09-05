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
    	sample_data.append({ "id": sample.id, 
                            "sample_id": sample.sample_id,
                            "reference_transcriptome": sample.reference_transcriptome,
                            "web_summary_url": sample.web_summary_url })

    if request.args['_order'] == 'ASC':
        if request.args['_sort'] == 'sample_id':
            # sort sample_data alphabetically by sample_id
            sample_data.sort(key=lambda x: x['sample_id'])
        elif request.args['_sort'] == 'reference_transcriptome':
            # sort sample_data alphabetically by reference_transcriptome
            sample_data.sort(key=lambda x: x['reference_transcriptome'])
    elif request.args['_order'] == 'DESC':
        if request.args['_sort'] == 'sample_id':
            sample_data.sort(key=lambda x: x['sample_id'], reverse=True)
        elif request.args['_sort'] == 'reference_transcriptome':
            sample_data.sort(key=lambda x: x['reference_transcriptome'], reverse=True)

    if 'q' in request.args:
    	# perform search using list comprehensions
    	query_string = request.args['q']
    	# we make the search case-insensitive
    	data_for_response = [x for x in sample_data if query_string.lower() in x['sample_id'].lower()]
    else:
    	# TODO: Return only the requested # of items
    	data_for_response = sample_data[:10]


    response = flask.Response(json.dumps(data_for_response))
    response.headers.add('X-Total-Count', len(data_for_response))
    response.headers.add('Access-Control-Expose-Headers', 'X-Total-Count')

    return(response)