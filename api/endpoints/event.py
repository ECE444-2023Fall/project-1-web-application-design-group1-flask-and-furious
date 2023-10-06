import os

from dotenv import load_dotenv
from flask import request
from flask_restx import Namespace, Resource
from supabase import Client, create_client

load_dotenv()

SUPABASE_PROJECT_URL: str = os.getenv("PUBLIC_SUPABASE_URL")
SUPABASE_API_KEY: str = os.getenv("PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

print(SUPABASE_PROJECT_URL)

api = Namespace("event", description="event related operations")


@api.route("/")
class Event(Resource):
    def get(self):
        print("headers: ", request.headers)
        try:
            token = request.headers.get("Authentication").split()[1]
            print("token: ", token)
            print("session: ", supabase.auth.get_user(token))
            return {"message": "Hello, World!, youre authnticated"}
        except Exception as e:
            print("error: ", e)
            return {
                "message": "Server Error: Authentication token not found or invalid"
            }

    def post(self):
        return {"message": "Hello, World!"}
