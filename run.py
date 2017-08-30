# launch web server locally
from app.api import app

if __name__ == '__main__':
    # # no debug
    # application.run(host='0.0.0.0')

    # running in debug mode
    app.run(host='0.0.0.0', debug=True)