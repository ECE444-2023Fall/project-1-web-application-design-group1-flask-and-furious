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
            user = supabase.auth.get_user(token)
            print("user: ",user)
            uuid = user.user.id
            print("uuid: ",uuid)
            req = supabase.table('Events').select('*').eq('Owner', uuid).execute()
            data = req.model_dump_json()
            print("here:",req,"a",data,"b")
            return (data)
        except Exception as e:
            print("error: ", e)
            return {
                "message": "Server Error: Authentication token not found or invalid"
            }

    def post(self):
        try:
            data = request.get_json()
            print("Received data:", data)
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            data_to_insert = {
                "Date": data["date"],
                "Description": data["description"],
                "EndTime": data["endTime"],
                "Frequency": data["frequency"],
                "Location": data["location"],
                "Owner": uuid,
                "StartTime": data["startTime"],
                "Tags": data.get("tags", []),
                "Title": data["title"]
            }
            print("UPLOADING THIS: ",data_to_insert)
            supabase.table('Events').upsert(data_to_insert).execute()
            return "Done"
        except Exception as e:
            print("Error:", e)
            return {"message": "Server Error: Something went wrong while processing the data"}
    
api.add_namespace(event_api)
api.init_app(app)


