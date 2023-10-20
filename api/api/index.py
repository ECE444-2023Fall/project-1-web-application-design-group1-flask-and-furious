import os

from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from flask_restx import Namespace, Resource, Api
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(app, resources={r"/api/*": {"origins": "*"}})

SUPABASE_PROJECT_URL: str = os.getenv("PUBLIC_SUPABASE_URL")
SUPABASE_API_KEY: str = os.getenv("PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

api = Api(
    title="ECE444 API",
    version="1.0",
    description="A simple API manage events",
    prefix="/api",
)

event_api = Namespace("event", description="event related operations")

@event_api.route("/")
class Event(Resource):
    def get(self):
        print("headers: ", request.headers)
        try:
            token = request.headers.get("Authentication").split()[1]
            print("token: ", token)
            print("session: ", supabase.auth.get_user(token))
            req = supabase.table('Events').select('*').execute()
            data = req.json()
            print("here:",req,"a",data,"b")
            return (data)
        except Exception as e:
            print("error: ", e)
            return {
                "message": "Server Error: Authentication token not found or invalid"
            }

    def post(self):
        return {"message": "Hello, World!"}
    
api.add_namespace(event_api)
api.init_app(app)


