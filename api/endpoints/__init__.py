from flask_restx import Api

from .event import api as event_api

api = Api(
    title="ECE444 API",
    version="1.0",
    description="A simple API manage events",
    prefix="/api",
)

api.add_namespace(event_api)
