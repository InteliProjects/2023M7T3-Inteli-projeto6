# encoding: utf-8

from flask import Flask, request
from flask_cors import CORS
import asyncio
import pandas as pd
import nlp_functions as nlp
import requests

import time
from threading import Thread

import logging
from logging.config import dictConfig
from dotenv import load_dotenv
import json
from os.path import join, dirname

logging.basicConfig(filename='nlp_records.log', level=logging.INFO)

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
})

load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def hello():
    return "ok"

@app.route("/process", methods=['POST'])
async def processText():
    try:
        # text = json.loads(request.data)["text"]
        # userId = json.loads(request.data)["userId"]
        # url = json.loads(request.data)["url"]
        # title = json.loads(request.data)["title"]
        text = json.loads(request.data)["text"]
        userId = json.loads(request.data)["userId"]
        messageId = json.loads(request.data)["messageId"]
        
        if len(text) >= 1:
            thread = Thread(target=nlp.pipeline, kwargs={'texto': request.args.get('texto', text), 'userId': request.args.get('userId', userId), 'messageId': request.args.get('messageId', messageId)})
            thread.start()
            return "OK, processing your text"
        else:
            return "Error"
            
    except requests.exceptions.HTTPError as err:
        print("An HTTP Error occurred",repr(err))
        return err

    except requests.exceptions.ConnectionError as err:
        print("An Error Connecting to the API occurred", repr(err))
        return err

    except requests.exceptions.Timeout as err:
        print("A Timeout Error occurred", repr(err))

    except requests.exceptions.RequestException as err:
        print("An Unknown Error occurred", repr(err))
        return err

    except:
        return "Error"
