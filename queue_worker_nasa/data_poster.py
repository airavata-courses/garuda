import requests
import json
from constants import getConstants

# get constants
constants = getConstants()

def api_request(method, url, header=None, data=None, response_type='json'):
    response = requests.request(method, url, headers=header, data=data)
    if response_type == 'json':
        try:
            response_message = response.json()
        except:
            response_message = None
        return response_message
    else:
        try:
            response_message = response.text
        except:
            response_message = None
        return response_message

def post_data(data):
    try:
        URL = "http://" + constants["DB_MIDDLEWARE_WRITER_HOST"] + ":" + \
            constants["DB_MIDDLEWARE_WRITER_PORT"] + "/" + "data_writer"
        METHOD = 'POST'
        PAYLOAD = json.dumps(data)
        HEADERS = {
            'Content-Type': 'application/json'
        }

        response = api_request(METHOD, URL, header=HEADERS,
                            data=PAYLOAD, response_type='json')

        print(response)
    except:
        print("error in posting data... :(")
