from api.index import app
import os
import pytest
from supabase import Client, create_client

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

def test_get_all_events(client):
    response = client.get("/api/events", follow_redirects=True)

    # print(response.data)
    assert response.status_code == 200
