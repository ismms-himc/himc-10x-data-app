import datetime
import jwt

from app.api import app, db, bcrypt

class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    himc_staff = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, first_name, last_name, email, password, himc_staff=False):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()
        self.registered_on = datetime.datetime.now()
        self.himc_staff = himc_staff

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
            # TODO: 
            # 1) check if expired token results in user being booted from app 
            # immediately or only after closing/logging out from app?
            # 2) does logging out automatically make the token expired?
            # 3) change expiration date to more than 5 seconds. 
                # expiration date of the token
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                # iat is the time the token is generated
                'iat': datetime.datetime.utcnow(),
                # sub is the subject of the token (the user whom it identifies)
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    # We use a static method since it does not relate to the class's instance.
    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

