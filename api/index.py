import os

from dotenv import load_dotenv
from endpoints import api
from flask import Flask
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

CORS(app, resources={r"/api/*": {"origins": "*"}})
api.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)
