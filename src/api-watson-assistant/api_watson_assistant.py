
from flask import Flask, request, jsonify

from dotenv import load_dotenv
import os

from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


load_dotenv()  # take environment variables from .env.

app = Flask(__name__)

# Create Assistant service object.
authenticator = IAMAuthenticator(os.getenv('WATSON_ASSISTANT_APIKEY'))
assistant = AssistantV2(
    version = '2021-11-27',
    authenticator = authenticator
)
assistant.set_service_url(os.getenv('WATSON_ASSISTANT_URL'))
assistant_id = os.getenv('WATSON_ASSISTANT_ENVIRONMENT_ID')

context = {} #manter o contexto da conversa, para que seja contínua

@app.route("/message", methods=['POST'])
def message():
    global context  # Declare context as global
    data = request.json
    user_input = data.get('text', '')


    # Initialize with empty value to start the conversation.
    # message_input = {
    #     'message_type:': 'text',
    #     'text': ''
    #     }

    # Main input/output loop
    # while message_input['text'] != 'quit':

    # Send message to assistant.
    result = assistant.message_stateless(
        assistant_id,
        input = {'message_type': 'text', 'text': user_input},
        context = context
    ).get_result()

    context = result['context']

    response_text = []

    # Print responses from actions, if any. Supports only text responses.
    if result['output']['generic']:
        for response in result['output']['generic']:
            if response['response_type'] == 'text':
                print(response['text'])
                response_text.append(response['text'])


    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run()

