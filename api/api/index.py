import json
import os
from tempfile import gettempdir

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restx import Namespace, Resource, Api
from supabase import Client, create_client
from werkzeug.utils import secure_filename
from werkzeug.exceptions import BadRequest


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

def allowed_file(filename):
    # This function checks for allowed file extensions
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
            # print("\n\n\nHere is the Data: ", events_data, "\n\n\n")

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
            token = request.headers.get("Authorization").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            event_id = request.form.get("eventId")
            event = supabase.table('Events').select("Owner").eq('id', event_id).execute()
            eventdata = json.loads(event.model_dump_json())
            owner = eventdata['data'][0]['Owner']

            if owner != uuid:
                return jsonify({"message": "Unauthorized: You cannot update this event"}), 401
            tags = request.form.get("tags")
            if tags:
                try:
                    tags = json.loads(tags)  # This should be a list after parsing
                except json.JSONDecodeError:
                    raise BadRequest("Invalid JSON format for tags")
            # Perform update
            data_to_update = {
                "Date": request.form.get("date"),
                "Description": request.form.get("description"),
                "EndTime": request.form.get("endTime"),
                "Frequency": request.form.get("frequency"),
                "Location": request.form.get("location"),
                "StartTime": request.form.get("startTime"),
                "Tags": tags,
                "Title": request.form.get("title")
            }
            supabase.table('Events').update(data_to_update).eq('id', event_id).execute()
            file = request.files.get("file")
            if file:
                filename = secure_filename(f'event-{event_id}')
                image_req = supabase.storage.from_('Images').get_public_url(filename)
                if image_req:
                    supabase.storage.from_('Images').remove([filename])
                tempdir = gettempdir() 
                temp_file_path = os.path.join(tempdir, filename)
                file.save(temp_file_path)

                supabase.storage.from_('Images').upload(f"{filename}",\
                temp_file_path, file_options={"content-type": file.content_type})
                file.close()

            return 200
        except Exception as e:
            print("Update Error:", e)
            return "Error"
        
    def delete(self):
        try:
            data = request.get_json()
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


