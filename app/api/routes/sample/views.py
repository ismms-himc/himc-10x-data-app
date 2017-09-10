import flask
from flask import request, Blueprint
from app.api.models.sample import Sample
import json

import boto3
# # TODO: needed?
# import botocore

import os

SAMPLE_BUCKET_NAME = 'himc-10x-data'

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
    sample_data = {}
    for sample in samples:
        web_summary_filename = sample.web_summary_url

        # bucket.download_file(web_summary_filename,
        #                 os.path.expanduser(f'~/Desktop/{web_summary_filename}'))

        sample_data[int(sample.id)] = ({ "id": sample.id,
                            "sample_id": sample.sample_id,
                            "reference_transcriptome": sample.reference_transcriptome,
                            "web_summary_url": sample.web_summary_url })
        # import pdb; pdb.set_trace()
    # if len(request.args) > 0:
    #     if request.args['_order'] == 'ASC':
    #         print('in here?')
    #         if request.args['_sort'] == 'sample_id':
    #             # sort sample_data alphabetically by sample_id
    #             sample_data.sort(key=lambda x: x['sample_id'])
    #         elif request.args['_sort'] == 'reference_transcriptome':
    #             # sort sample_data alphabetically by reference_transcriptome
    #             sample_data.sort(key=lambda x: x['reference_transcriptome'])
    #     elif request.args['_order'] == 'DESC':
    #         if request.args['_sort'] == 'sample_id':
    #             sample_data.sort(key=lambda x: x['sample_id'], reverse=True)
    #         elif request.args['_sort'] == 'reference_transcriptome':
    #             sample_data.sort(key=lambda x: x['reference_transcriptome'], reverse=True)
    #
    # if 'q' in request.args:
    # 	# perform search using list comprehensions
    # 	query_string = request.args['q']
    # 	# we make the search case-insensitive
    # 	data_for_response = [x for x in sample_data if query_string.lower() in x['sample_id'].lower()]
    # else:
    # 	# TODO: Return only the requested # of items
    #     data_for_response = sample_data[:10]
    #
    response = flask.Response(json.dumps(sample_data))
    response.headers.add('X-Total-Count', len(sample_data))
    response.headers.add('Access-Control-Expose-Headers', 'X-Total-Count')

    return(response)

@sample_blueprint.route('/samples/<int:sample_id>/web_summary_url', methods=['GET'])
# Returns a presigned S3 URL for a sample's web summary.
def get_web_summary_url(sample_id):
    s3 = boto3.client('s3')
    sample = Sample.query.get(sample_id)

    key = '{run_id}/{reference_transcriptome}/{sample_id}/web_summary.html'.format(
        run_id=sample.run_id,
        reference_transcriptome=sample.reference_transcriptome,
        sample_id=sample.sample_id)

    # import pdb; pdb.set_trace()
    web_summary_url = s3.generate_presigned_url(
        ClientMethod='get_object',
        ExpiresIn=3600,
        Params={
            'Bucket': SAMPLE_BUCKET_NAME,
            'Key': key
        }
    )
    return flask.Response(json.dumps({"web_summary_url": web_summary_url}))
