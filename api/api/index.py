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
    def get(self):
        print("headers: ", request.headers)
        try:
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            req = supabase.table('Events').select('*').eq('Owner', uuid).execute()
            events_data = req.data
            print("\n\n\nHere is the Data: ", events_data, "\n\n\n")

            # Iterate over each event and get the public URL for the image
            for event in events_data:
                # Here we use the event's ID to get the image URL
                image_req = supabase.storage.from_('Images').get_public_url(f'event-{event["id"]}')
                print("PublicUrl: ", image_req)
                if image_req:
                    event['image_url'] = image_req
                else:
                    event['image_url'] = None
            print("\n\n\nHere is the Data with Images: ", events_data, "\n\n\n")
            return req.model_dump_json(), 200
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


