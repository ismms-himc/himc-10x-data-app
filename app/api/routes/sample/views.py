import flask
from flask import request, Blueprint
from app.api.models.sample import Sample
import json

import boto3

import os

SAMPLE_BUCKET_NAME = 'himc-10x-data'

sample_blueprint = Blueprint('sample_pages', __name__)

@sample_blueprint.route('/api/samples', methods=['GET'])
# TODO: only show samples that belong to logged in user
# Returns all samples belonging to logged in user. HIMC staff will have access
# to all samples.
def get_samples():
    samples = Sample.query.all()
    sample_data = {}
    for sample in samples:
        sample_data[int(sample.id)] = ({ "id": sample.id,
                            "sample_id": sample.sample_id,
                            "reference_transcriptome": sample.reference_transcriptome,
                            "run_id": sample.run_id })
                            
    response = flask.Response(json.dumps(sample_data))
    response.headers.add('X-Total-Count', len(sample_data))
    response.headers.add('Access-Control-Expose-Headers', 'X-Total-Count')

    return(response)

@sample_blueprint.route('/api/samples/<int:sample_id>/web_summary_url', methods=['GET'])
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
