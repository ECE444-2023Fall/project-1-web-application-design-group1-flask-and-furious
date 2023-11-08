from api.index import app
import os
import pytest
from supabase import Client, create_client
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:

        # Use Test User Credentials
        test_user_credentials = {
            'email': os.environ.get("TEST_EMAIL"),
            'password': os.environ.get("TEST_PASSWORD")
        }
        
        # Login Test User
        url: str = os.environ.get("PUBLIC_SUPABASE_URL")
        key: str = os.environ.get("PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)
        supabase.auth.sign_in_with_password(test_user_credentials)
        session = supabase.auth.get_session()

        client.environ_base['HTTP_AUTHORIZATION'] = 'Bearer ' + session.access_token

        yield client
        supabase.auth.sign_out()

# Check that valid data is received from events endpoint
def test_get_all_events(client):
    response = client.get("/api/events", follow_redirects=True)
    event_data =json.loads(response.json)['data']

    assert len(event_data) > 0
    assert response.status_code == 200

# Test that filtering results reduces the number of results
def test_get_owned_events(client):
    response = client.get("/api/events", follow_redirects=True)
    event_data =json.loads(response.json)['data']

    filtered_response = client.get(
            "/api/events" + "?userUuid=5b79b99c-b5f8-4394-8b30-da22ebaca975", 
            follow_redirects=True
        )
    filtered_event_data =json.loads(filtered_response.json)['data']

    assert len(event_data) > len(filtered_event_data)
    assert response.status_code == 200
