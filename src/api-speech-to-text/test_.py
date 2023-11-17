import io
import json
import pytest
from api_speech_to_text import app as API

@pytest.fixture()
def app():
    app = API
    app.config.update({
        "TESTING": True,
    })
    yield app

@pytest.fixture()
def client(app):
    return app.test_client()

@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
  
def test_transcript(client):
    data = dict(
      audio = (io.BytesIO(b"abcdef"), 'audio.wav')
    )
    response = client.post("/transcript", data=data, content_type='multipart/form-data')
    assert response.data == b'OK, processing your audio'
    
def test_transcript_no_data(client):
    response = client.post("/transcript")
    assert response.data == b'Error'
    
def test_transcript_wrong_type(client):
    data = dict(
        audio = (io.BytesIO(b"abcde"), 'audio.wav')
    )
    response = client.post("/transcript", data=data, content_type='application/json')
    assert response.data == b'Error'

def test_transcript_empty_audio(client):
    data = dict(
        audio = None
    )
    response = client.post("/transcript", data=data, content_type='multipart/form-data')
    assert response.data == b'Error'