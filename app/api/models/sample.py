import datetime
import jwt

from app import app, db, bcrypt

class Sample(db.Model):
    """ Sample Model for storing sample related details """
    __tablename__ = "samples"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sample_id = db.Column(db.String(255), nullable=False)
    reference_transcriptome = db.Column(db.String(255))
    run_id = db.Column(db.String(255), nullable=False)
    # TODO: incorporate connection to AWS S3 for the following:
    # 1.) web_summary
    # 2.) filtered_gene_bc_matrices
    # 3.) raw_gene_bc_matrices

    # TODO: store all outputs on S3 as cloud backup

    def __init__(self, sample_id):
        self.sample_id = sample_id
