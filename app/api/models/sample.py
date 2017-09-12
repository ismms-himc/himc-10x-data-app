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

    def __init__(self, sample_id):
        self.sample_id = sample_id
