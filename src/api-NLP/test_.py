import json
import pytest
from api_nlp import app as API

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
  
def test_process(client):
    response = client.post("/process", data=json.dumps({
      "text": "Quantas empresas estão atuando em tecnologia hoje?"
    }))
    assert response.data == b'OK, processing your text'
    
def test_process_no_data(client):
    response = client.post("/process")
    assert response.data == b'Error'
    
def test_process_wrong_key(client):
    response = client.post("/process", data=json.dumps({
        "transcription": "Quantas empresas estão atuando em tecnologia hoje?"
    }))
    assert response.data == b'Error'

def test_process_empty_text(client):
    response = client.post("/process", data=json.dumps({
        "text": ""
    }))
    assert response.data == b'Error'