import json
import os
from tempfile import gettempdir

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restx import Api, Namespace, Resource
from supabase import Client, create_client
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename

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
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


event_api = Namespace("events", description="event related operations")


@event_api.route("/")
class Event(Resource):
    @event_api.doc(
        description="Retrieve events. Optionally filtered by Query Parameters."
    )
    @event_api.param("userUuid", "The uuid of the user to filter by")
    def get(self):
        print("headers: ", request.headers)
        try:
            table = supabase.table("Events").select("*")

            # Apply Filters
            user_uuid = request.args.get("userUuid")
            if user_uuid:
                table = table.eq("Owner", user_uuid)

            # Rough Filter Format:
            # param = request.args.get(<NAME IN PARAMS>)
            # if param:
            #   table = table.eq(<TABLE_COLUMN>, param)

            table_query = table.execute()
            for event in table_query.data:
                # Here we use the event's ID to get the image URL
                image_req = supabase.storage.from_("Images").get_public_url(
                    f'event-{event["id"]}'
                )
                # print("PublicUrl: ", image_req)
                if image_req:
                    event["image_url"] = image_req
                else:
                    event["image_url"] = None

            return table_query.model_dump_json(), 200
        except Exception as e:
            print("error: ", e)
            return {
                "message": "Server Error: Authentication token not found or invalid"
            }

    def post(self):
        try:
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            tags = request.form.get("tags")
            if tags:
                try:
                    tags = json.loads(tags)
                except json.JSONDecodeError:
                    raise BadRequest("Invalid JSON format for tags")
            data_to_insert = {
                "Date": request.form.get("date"),
                "Description": request.form.get("description"),
                "EndTime": request.form.get("endTime"),
                "Frequency": request.form.get("frequency"),
                "Location": request.form.get("location"),
                "Owner": uuid,
                "StartTime": request.form.get("startTime"),
                "Tags": tags,
                "Title": request.form.get("title"),
            }
            print("\n\nA")
            print(data_to_insert)
            event_insert_response = (
                supabase.table("Events").upsert(data_to_insert).execute()
            )
            print("\n\nB")
            event_id = event_insert_response.data[0]["id"]
            print("\n\n\n Event ID: ", event_id)
            file = request.files.get("file")
            if file:
                filename = secure_filename(f"event-{event_id}")
                image_req = supabase.storage.from_("Images").get_public_url(filename)
                if image_req:
                    supabase.storage.from_("Images").remove([filename])
                tempdir = gettempdir()
                temp_file_path = os.path.join(tempdir, filename)
                file.save(temp_file_path)

                supabase.storage.from_("Images").upload(
                    f"{filename}",
                    temp_file_path,
                    file_options={"content-type": file.content_type},
                )
                file.close()

        except Exception as e:
            print("Error:", e)
            return {
                "message": "Server Error: Something went wrong while processing the data"
            }

    def put(self):
        try:
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id
            event_id = request.form.get("eventId")
            event = (
                supabase.table("Events").select("Owner").eq("id", event_id).execute()
            )
            eventdata = json.loads(event.model_dump_json())
            owner = eventdata["data"][0]["Owner"]

            if owner != uuid:
                return (
                    jsonify({"message": "Unauthorized: You cannot update this event"}),
                    401,
                )
            tags = request.form.get("tags")
            if tags:
                try:
                    tags = json.loads(tags)
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
                "Title": request.form.get("title"),
            }
            supabase.table("Events").update(data_to_update).eq("id", event_id).execute()
            file = request.files.get("file")
            if file:
                filename = secure_filename(f"event-{event_id}")
                image_req = supabase.storage.from_("Images").get_public_url(filename)
                if image_req:
                    supabase.storage.from_("Images").remove([filename])
                tempdir = gettempdir()
                temp_file_path = os.path.join(tempdir, filename)
                file.save(temp_file_path)

                supabase.storage.from_("Images").upload(
                    f"{filename}",
                    temp_file_path,
                    file_options={"content-type": file.content_type},
                )
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
            event_id = data["eventId"]
            event = (
                supabase.table("Events").select("Owner").eq("id", event_id).execute()
            )
            eventdata = json.loads(event.model_dump_json())
            owner = eventdata["data"][0]["Owner"]
            if owner != uuid:
                return {"message": "Unauthorized: You cannot delete this event"}, 401
            # perform delete
            supabase.table("Events").delete().eq("id", data["eventId"]).execute()
            # delete associated image:
            filename = secure_filename(f"event-{event_id}")
            # Delete the image from the Images bucket
            supabase.storage.from_("Images").remove([filename])
            return "Deleted Successfully"
        except Exception as e:
            print("Delete Error:", e)
            return {
                "message": "Server Error: Something went wrong while processing the delete"
            }


profile_api = Namespace("profiles", description="profile related operations")


@profile_api.route("/")
class Profile(Resource):
    @profile_api.doc(description="Retrieve Profile Information.")
    @profile_api.param("userUuid", "The uuid of the user to filter by")
    def get(self):
        try:
            table = supabase.table("Profiles").select("*")
            user_uuid = request.args.get("userUuid")
            if user_uuid:
                table = table.eq("id", user_uuid)
            data = table.execute().model_dump_json()
            return data
        except Exception as e:
            print("error: ", e)
            return {
                "message": "Server Error: Authentication token not found or invalid"
            }

    def put(self):
        try:
            data = request.get_json()
            print(data)

            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            uuid = user.user.id

            data_to_update = {
                "age": data["age"],
                "gender": data["gender"],
                "city": data["city"],
                "university": data["university"],
                "program": data["program"],
                "tags": data["tags"]
            }

            supabase.table("Profiles").update(data_to_update).eq("id", uuid).execute()
            return "Done"
        except Exception as e:
            print("Update Error:", e)
            return {
                "message": "Server Error: Something went wrong while processing the update"
            }


@profile_api.route("/picture")
class ProfilePicture(Resource):
    def get(self):
        try:
            token = request.headers.get("Authentication").split()[1]
            user = supabase.auth.get_user(token)
            profileId = user.user.id
            print(f"Profile ID: {user}")
            if profileId:
                # Get the profile picture url from the Profiles table
                image_req = (
                    supabase.table("Profiles")
                    .select("pictureUrl")
                    .eq("id", profileId)
                    .execute()
                )

                return image_req.model_dump_json()
            else:
                return {"message": "No profileId provided"}, 400
        except Exception as e:
            print("Update Error:", e)
            return {
                "message": "Server Error: Something went wrong while processing the update"
            }

    def put(self):
        try:
            token = request.headers.get("Authentication").split()[1]
            _user = supabase.auth.get_user(token)
            file = request.files.get("picture")
            profileId = request.form.get("profileId")
            if file and profileId:
                filename = secure_filename(f"profile-picture-{profileId}")
                image_req = supabase.storage.from_("ProfilePhotos").get_public_url(
                    filename
                )
                if image_req:
                    supabase.storage.from_("ProfilePhotos").remove([filename])
                tempdir = gettempdir()
                temp_file_path = os.path.join(tempdir, filename)
                file.save(temp_file_path)

                supabase.storage.from_("ProfilePhotos").upload(
                    filename,
                    temp_file_path,
                    file_options={"content-type": file.content_type},
                )
                file.close()

                # get the newly uploaded image url
                image_req = supabase.storage.from_("ProfilePhotos").get_public_url(
                    filename
                )
                # Update the profile picture url in the Profiles table
                supabase.table("Profiles").update({"pictureUrl": image_req}).eq(
                    "id", profileId
                ).execute()

            return {"message": "Profile picture uploaded successfully"}, 200
        except Exception as e:
            print("Update Error:", e)
            return {
                "message": "Server Error: Something went wrong while processing the update"
            }


api.add_namespace(event_api)
api.add_namespace(profile_api)
api.init_app(app)
