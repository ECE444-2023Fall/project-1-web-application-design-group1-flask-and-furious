import json
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

event_api = Namespace("events", description="event related operations")

@event_api.route("/")
class Event(Resource):
    @event_api.doc(description="Retrieve events. Optionally filtered by Query Parameters.")
    @event_api.param("userUuid", "The uuid of the user to filter by")
    def get(self):
        print("headers: ", request.headers)
        try:
            table = supabase.table('Events').select('*')
            
            # Apply Filters
            user_uuid = request.args.get('userUuid')
            if user_uuid:
                table = table.eq('Owner', user_uuid)

            # Rough Filter Format:
            # param = request.args.get(<NAME IN PARAMS>)
            # if param: table = table.eq(<TABLE_COLUMN>, param)

            data = table.execute().model_dump_json()
            return (data)
        except Exception as e:
            print("error: ", e)
            return {
                "message": "Server Error: Authentication token not found or invalid"
            }

    def post(self):
        try:
            data = request.get_json()
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
            supabase.table('Events').upsert(data_to_insert).execute()
            return "Done"
        except Exception as e:
            print("Error:", e)
            return {"message": "Server Error: Something went wrong while processing the data"}
    
    def put(self):
        try:
            data = request.get_json()
            #valid user check
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            event = supabase.table('Events').select("Owner").eq('id', data["eventId"]).execute()
            eventdata = json.loads(event.model_dump_json())
            owner = eventdata['data'][0]['Owner']
            if owner != uuid:
                return {"message": "Unauthorized: You cannot delete this event"}, 401
            #perform update
            data_to_update = {
                "Date": data["date"],
                "Description": data["description"],
                "EndTime": data["endTime"],
                "Frequency": data["frequency"],
                "Location": data["location"],
                "StartTime": data["startTime"],
                "Tags": data.get("tags", []),
                "Title": data["title"]
            }
            supabase.table('Events').update(data_to_update).eq('id', data["eventId"]).execute()
            return "Done"
        except Exception as e:
            print("Update Error:", e)
            return {"message": "Server Error: Something went wrong while processing the update"}
    
    def delete(self):
        try:
            data = request.get_json()
            #valid user check
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            event = supabase.table('Events').select("Owner").eq('id', data["eventId"]).execute()
            eventdata = json.loads(event.model_dump_json())
            owner = eventdata['data'][0]['Owner']
            if owner != uuid:
                return {"message": "Unauthorized: You cannot delete this event"}, 401
            #perform delete
            supabase.table('Events').delete().eq('id', data["eventId"]).execute()
            return "Deleted Successfully"
        except Exception as e:
            print("Delete Error:", e)
            return {"message": "Server Error: Something went wrong while processing the delete"}

api.add_namespace(event_api)
api.init_app(app)


