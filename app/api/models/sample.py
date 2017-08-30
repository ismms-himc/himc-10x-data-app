import datetime
import jwt

from app import app, db, bcrypt

class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "samples"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sample_id = db.Column(db.String(255), nullable=False)
    # TODO: incorporate connection to AWS S3 for the following:
    # 1.) web_summary
    # 2.) filtered_gene_bc_matrices
    # 3.) raw_gene_bc_matrices

    # TODO: store all outputs on S3 as cloud backup

    def __init__(self, sample_id):
        self.sample_id = sample_id
