# contains useful scripts (run, initdb, testing, list routes, etc) using 
# Flask-Script

import os
import unittest
import coverage

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

COV = coverage.coverage(
    branch=True,
    include='himc-10x-data-app/*',
    omit=[
        'himc-10x-data-app/tests/*',
        'himc-10x-data-app/app/config.py',
        # TODO: below needed? no equivalent to the jwt-auth line below-- now there is
        'himc-10x-data-app/app/api/__init__.py'
    ]
)
COV.start()

# TODO: does below work or will there be an issue because application.py is not __init__.py
# also not sure if models will work
# 8/22 update: change application.py to __init__.py
# TODO: check if we need to import specific model files
# (ex: from app.api.models import sample, user)
from app import app, db
from app.api.models import user, sample
# from project.server import app, db, models

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    """Runs the unit tests without test coverage."""
    tests = unittest.TestLoader().discover('tests/', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('tests/')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'tmp/coverage')
        COV.html_report(directory=covdir)
        print('HTML version: file://%s/index.html' % covdir)
        COV.erase()
        return 0
    return 1


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


@manager.command
def drop_db():
    """Drops the db tables."""
    db.drop_all()


# To seed database with toy sample data:
# TODO: find out how to seed db via alembic
# from alembic import op
# def seed_sample_data():
#     op.bulk_insert

if __name__ == '__main__':
	manager.run()