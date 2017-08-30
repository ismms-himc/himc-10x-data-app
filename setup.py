# TODO: is this file used?

from setuptools import setup

setup(
    name='himc-10x-data-app',
    packages=['app'], # TODO: or himc-10x-data-app?
    include_package_data=True,
    install_requires=[
        'flask', # TODO: add more as needed
    ],
)