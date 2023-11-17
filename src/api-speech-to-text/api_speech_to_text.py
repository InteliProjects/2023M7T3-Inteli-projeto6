#encoding: utf-8

import json
from multiprocessing import Process
from flask import Flask, request
from flask_cors import CORS

import multiprocessing as mp

import stt_functions as stt

import logging
from logging.config import dictConfig
from dotenv import load_dotenv
import os
from os.path import join, dirname
import threading

logging.basicConfig(filename='stt_records.log', level=logging.INFO)

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

from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import ApiException
import requests

authenticator = IAMAuthenticator(os.getenv('SPEECH_TO_TEXT_APIKEY'))
service = SpeechToTextV1(authenticator=authenticator,)
service.set_service_url(os.getenv('SPEECH_TO_TEXT_URL'))

# class MyRecognizeCallback(RecognizeCallback):
#     def __init__(self):
#         RecognizeCallback.__init__(self)

    # def on_transcription(self, transcript):
    #     print(transcript)

    # def on_connected(self):
    #     print('Connection was successful')

    # def on_error(self, error):
    #     print('Error received: {}'.format(error))

    # def on_inactivity_timeout(self, error):
    #     print('Inactivity timeout: {}'.format(error))

    # def on_listening(self):
    #     print('Service is listening')

    # def on_hypothesis(self, hypothesis):
    #     print(hypothesis)

    # def on_data(self, data):
    #     transcription = stt.formatTranscription(data)
    #     requests.post("http://localhost:8000/v1/communication/sendNLP", transcription) 

def generateConfidence(confidences):
    result = 0
    for confidence in confidences:
        result += confidence
    
    result = result/len(confidences)
    return result

@app.route("/transcript", methods=['POST'])
def transcript():
    # try:
    #     mycallback = MyRecognizeCallback()
    #     response = []
    #     file = request.files['audio']
    #     if file:
    #         file.save('audio.wav')
    #         audio_file = open(join(dirname(__file__), 'audio.wav'), 'rb')
    #         audio_source  = AudioSource(audio_file)
    #         def run():
    #                 response = service.recognize_using_websocket(
    #                 recognize_callback=mycallback,
    #                 audio=audio_source,
    #                 content_type='audio/wav',
    #                 timestamps=True,
    #                 model='pt-BR_BroadbandModel',
    #                 word_confidence=True)
                
    #         thread = threading.Thread(target=run)
    #         return "OK, processing your audio", thread.start()
    #     else:
    #         return "Error"
    try:
        response = json.dumps(
        service.recognize(
                audio=request.files['audio'],
                content_type='audio/webm',
                timestamps=True,
                model='pt-BR_BroadbandModel',
                word_confidence=True).get_result(),
                indent=2, ensure_ascii=False
            )

        responseText = ""
        responseValue = []

        for results in json.loads(response)["results"]:
            for alternatives in results["alternatives"]:
                responseText += alternatives["transcript"]
                responseValue.append(alternatives["confidence"])
        
        responseFormated = {
            "transcript": responseText,
            "confidence": generateConfidence(responseValue)
        }
        return responseFormated

        return transcription
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

    except(err):
        print(err)
        return "Error"
