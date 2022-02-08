import time, random
from urllib import response
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
# import flask_cors
import configparser
import os, json
import pika, requests

app = Flask(__name__)
cors = CORS(app)

def log_error(err_code):
    '''
    Log error codes:
    -1 = Email id not provided in GET request for /getAllStatus
    '''
    if err_code == -1:
        print("Config file not found")
    elif err_code == -2:
        print("Config tab not found")
    elif err_code == -3:
        print("Status value not valid")
    
def push_to_rabbitmq(data):
    creds = pika.PlainCredentials('guest', 'guest')
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host = 'garuda_rabbitmq', port = 5672, virtual_host = "/", credentials = creds)
    )
    channel = connection.channel()
    channel.queue_declare(queue='offload_request')
    message = json.dumps(data)

    channel.basic_publish(exchange='', routing_key='offload_request', body=message)
    connection.close()
    '''
    Queue Request example: 
    {"requestID":"1234","stationID":"KABR","year":"2007","month":"01","date":"01","start_time":"000000","end_time":"003000","property":"Reflectivity"}
    '''

def api_request(method, url, header = None, data = None, response_type = 'json'):
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

@app.route('/getAllInfo', methods = ['GET'])
@cross_origin()
def get_info_to_display():
    response = {
        "station_name" : ['DAN1', 'KABR', 'KABX', 'KAKQ', 'KAMA', 'KAMX', 'KAPX', 'KARX', 'KATX', 'KBBX', 'KBGM', 'KBHX', 'KBIS', 'KBLX', 'KBMX', 'KBOX', 'KBRO', 'KBUF', 'KBYX', 'KCAE', 'KCBW', 'KCBX', 'KCCX', 'KCLE', 'KCLX', 'KCRP', 'KCXX', 'KCYS', 'KDAX', 'KDDC', 'KDFX', 'KDGX', 'KDLH', 'KDMX', 'KDOX', 'KDTX', 'KDVN', 'KEAX', 'KEMX', 'KENX', 'KEOX', 'KEPZ', 'KESX', 'KEVX', 'KEWX', 'KEYX', 'KFCX', 'KFDR', 'KFFC', 'KFSD', 'KFSX', 'KFTG', 'KFWS', 'KGGW', 'KGJX', 'KGLD', 'KGRB', 'KGRK', 'KGRR', 'KGSP', 'KGWX', 'KGYX', 'KHDX', 'KHGX', 'KHNX', 'KHPX', 'KHTX', 'KICT', 'KICX', 'KILN', 'KILX', 'KIND', 'KINX', 'KIWA', 'KIWX', 'KJAX', 'KJGX', 'KJKL', 'KLBB', 'KLCH', 'KLGX', 'KLIX', 'KLNX', 'KLOT', 'KLRX', 'KLSX', 'KLTX', 'KLVX', 'KLWX', 'KLZK', 'KMAF', 'KMAX', 'KMBX', 'KMHX', 'KMKX', 'KMLB', 'KMOB', 'KMPX', 'KMQT', 'KMRX', 'KMSX', 'KMTX', 'KMUX', 'KMVX', 'KMXX', 'KNKX', 'KNQA', 'KOAX', 'KOHX', 'KOKX', 'KOTX', 'KPAH', 'KPBZ', 'KPDT', 'KPOE', 'KPUX', 'KRAX', 'KRGX', 'KRIW', 'KRLX', 'KRTX', 'KSFX', 'KSGF', 'KSHV', 'KSJT', 'KSOX', 'KSRX', 'KTBW', 'KTFX', 'KTLH', 'KTLX', 'KTWX', 'KTYX', 'KUDX', 'KUEX', 'KVNX', 'KVTX', 'KVWX', 'KYUX', 'PHKI', 'PHKM', 'PHMO', 'PHWA', 'TJUA'],
        # "time" : ['00:00:00 - 00:29:59', '00:30:00 - 00:59:59', '01:00:00 - 01:29:59', '01:30:00 - 01:59:59', '02:00:00 - 02:29:59', '02:30:00 - 02:59:59', '03:00:00 - 03:29:59', '03:30:00 - 03:59:59', '04:00:00 - 04:29:59', '04:30:00 - 04:59:59', '05:00:00 - 05:29:59', '05:30:00 - 05:59:59', '06:00:00 - 06:29:59', '06:30:00 - 06:59:59', '07:00:00 - 07:29:59', '07:30:00 - 07:59:59', '08:00:00 - 08:29:59', '08:30:00 - 08:59:59', '09:00:00 - 09:29:59', '09:30:00 - 09:59:59', '10:00:00 - 10:29:59', '10:30:00 - 10:59:59', '11:00:00 - 11:29:59', '11:30:00 - 11:59:59', '12:00:00 - 12:29:59', '12:30:00 - 12:59:59', '13:00:00 - 13:29:59', '13:30:00 - 13:59:59', '14:00:00 - 14:29:59', '14:30:00 - 14:59:59', '15:00:00 - 15:29:59', '15:30:00 - 15:59:59', '16:00:00 - 16:29:59', '16:30:00 - 16:59:59', '17:00:00 - 17:29:59', '17:30:00 - 17:59:59', '18:00:00 - 18:29:59', '18:30:00 - 18:59:59', '19:00:00 - 19:29:59', '19:30:00 - 19:59:59', '20:00:00 - 20:29:59', '20:30:00 - 20:59:59', '21:00:00 - 21:29:59', '21:30:00 - 21:59:59', '22:00:00 - 22:29:59', '22:30:00 - 22:59:59', '23:00:00 - 23:29:59', '23:30:00 - 23:59:59'],
        "time" : ['00:00:00 - 00:14:59', '00:15:00 - 00:29:59', '00:30:00 - 00:44:59', '00:45:00 - 00:59:59', '01:00:00 - 01:14:59', '01:15:00 - 01:29:59', '01:30:00 - 01:44:59', '01:45:00 - 01:59:59', '02:00:00 - 02:14:59', '02:15:00 - 02:29:59', '02:30:00 - 02:44:59', '02:45:00 - 02:59:59', '03:00:00 - 03:14:59', '03:15:00 - 03:29:59', '03:30:00 - 03:44:59', '03:45:00 - 03:59:59', '04:00:00 - 04:14:59', '04:15:00 - 04:29:59', '04:30:00 - 04:44:59', '04:45:00 - 04:59:59', '05:00:00 - 05:14:59', '05:15:00 - 05:29:59', '05:30:00 - 05:44:59', '05:45:00 - 05:59:59', '06:00:00 - 06:14:59', '06:15:00 - 06:29:59', '06:30:00 - 06:44:59', '06:45:00 - 06:59:59', '07:00:00 - 07:14:59', '07:15:00 - 07:29:59', '07:30:00 - 07:44:59', '07:45:00 - 07:59:59', '08:00:00 - 08:14:59', '08:15:00 - 08:29:59', '08:30:00 - 08:44:59', '08:45:00 - 08:59:59', '09:00:00 - 09:14:59', '09:15:00 - 09:29:59', '09:30:00 - 09:44:59', '09:45:00 - 09:59:59', '10:00:00 - 10:14:59', '10:15:00 - 10:29:59', '10:30:00 - 10:44:59', '10:45:00 - 10:59:59', '11:00:00 - 11:14:59', '11:15:00 - 11:29:59', '11:30:00 - 11:44:59', '11:45:00 - 11:59:59', '12:00:00 - 12:14:59', '12:15:00 - 12:29:59', '12:30:00 - 12:44:59', '12:45:00 - 12:59:59', '13:00:00 - 13:14:59', '13:15:00 - 13:29:59', '13:30:00 - 13:44:59', '13:45:00 - 13:59:59', '14:00:00 - 14:14:59', '14:15:00 - 14:29:59', '14:30:00 - 14:44:59', '14:45:00 - 14:59:59', '15:00:00 - 15:14:59', '15:15:00 - 15:29:59', '15:30:00 - 15:44:59', '15:45:00 - 15:59:59', '16:00:00 - 16:14:59', '16:15:00 - 16:29:59', '16:30:00 - 16:44:59', '16:45:00 - 16:59:59', '17:00:00 - 17:14:59', '17:15:00 - 17:29:59', '17:30:00 - 17:44:59', '17:45:00 - 17:59:59', '18:00:00 - 18:14:59', '18:15:00 - 18:29:59', '18:30:00 - 18:44:59', '18:45:00 - 18:59:59', '19:00:00 - 19:14:59', '19:15:00 - 19:29:59', '19:30:00 - 19:44:59', '19:45:00 - 19:59:59', '20:00:00 - 20:14:59', '20:15:00 - 20:29:59', '20:30:00 - 20:44:59', '20:45:00 - 20:59:59', '21:00:00 - 21:14:59', '21:15:00 - 21:29:59', '21:30:00 - 21:44:59', '21:45:00 - 21:59:59', '22:00:00 - 22:14:59', '22:15:00 - 22:29:59', '22:30:00 - 22:44:59', '22:45:00 - 22:59:59', '23:00:00 - 23:14:59', '23:15:00 - 23:29:59', '23:30:00 - 23:44:59', '23:45:00 - 23:59:59'],
        "property" : ["Reflectivity"]
    }
    return jsonify(response)

@app.route('/getAllStatus', methods = ['GET'])
@cross_origin()
def get_user_job_status():
    try:
        userid = request.args.get('user_email')
    except:
        response = {
            "error_code" : -1,
            "error_message" : "user_email not provided"
        }
        # Log error
        return jsonify(response)

    # Call db helper to fetch data for email_id
    URL = "http://garudadbmiddleware:3001/getAllStatus"
    METHOD = 'POST'
    PAYLOAD = json.dumps({
        "user_email": str(userid)
        })
    HEADERS = {
    'Content-Type': 'application/json'
    }
    # response = requests.request("POST", url, headers=headers, data=payload)
    db_response = api_request(METHOD, URL, header=HEADERS, data=PAYLOAD, response_type='json')
    if db_response == None:
        response = {
            "error_code" : "-2",
            "error_message" : "No response received from the database service"
        }
        return jsonify(response)
    # Proess response
    response = {}
    if db_response['status'] == 'success':
        response['error_code'] = "0"
        response['error_message'] = db_response['message']
        response['request_details'] = db_response['requests']
    else:
        response['error_code'] = "1"
        response['error_message'] = db_response['message']
    return jsonify(response)

@app.route('/postNewRequest', methods = ['POST'])
@cross_origin()
def generate_new_request():
    try:
        request_data = request.get_json()
    except:
        response = {
            "response_code" : "2",
            "response_message" : "Request is not of type application/json"
        }
        return jsonify(response)
    try:
        station_key = request_data['station_name']
        db_date_absolute = str(request_data['date'])     
        db_date = db_date_absolute.replace(" ", "").replace("-", "")
        time_start, time_end = str(request_data['time']).replace(" ","").replace(":", "").split('-')
        property = request_data['property']
        user_email = request_data['user_email']
    except:
        response = {
            "response_code" : "3",
            "response_message" : "Incorrect keys passed in the json request"
        }
        return jsonify(response)
    db_key = f"{station_key}_{db_date}_{time_start}_{time_end}_{property}"

    # Make call to check db for this key
    URL = "http://garudadbmiddleware:3001/postCheckRequest"
    METHOD = 'POST'
    PAYLOAD = json.dumps({
        "request_id" : db_key,
        "property" : str(property)
    })
    HEADERS = {
    'Content-Type': 'application/json'
    }
    db_response = api_request(METHOD, URL, header=HEADERS, data=PAYLOAD, response_type='json')
    # Take response
    if db_response == None:
        response = {
            "response_code" : "1",
            "response_message" : "Failed to get response from database service"
        }
        return jsonify(response)
    
    # Make decision on response code and message
    response = {}
    if db_response['status'] == "success":
        response['response_code'] = "0"
        response['response_message'] = "Success"
        try:
            response['data_dump'] = db_response['requests']
        except:
            response['data_dump'] = ""
        # Make call to postNewRequest
        URL = "http://garudadbmiddleware:3001/postNewRequest"
        METHOD = 'POST'
        PAYLOAD = json.dumps({
            "user_email" : str(user_email),
            "request_id" : str(db_key),
            "time_stamp" : str(int(time.time())),
            "property" : str(property)
        })
        HEADERS = {
        'Content-Type': 'application/json'
        }
        newreq_response = api_request(METHOD, URL, header=HEADERS, data=PAYLOAD, response_type='json')
        if newreq_response == None:
            response['response_code'] = "2"
            response['response_message'] = "Failed to add new entry to userstatus"
            response['data_dump'] = ""
        if db_response['data_status'] == "false":
            # Make a call to rabbitmq
            '''
            Queue Request example: 
            {"requestID":"1234","stationID":"KABR","year":"2007","month":"01","date":"01","start_time":"000000","end_time":"003000","property":"Reflectivity"}
            '''
            rmq_month, rmq_date, rmq_year = db_date_absolute.split('-')
            rabbitmq_data = {
                "requestID" : str(db_key),
                "stationID" : str(station_key),
                "year" : rmq_year,
                "month" : rmq_month,
                "date" : rmq_date,
                "start_time" : time_start,
                "end_time" : time_end,
                "property" : str(property)
            }
            try:
                push_to_rabbitmq(data=rabbitmq_data)
            except:
                response['response_code'] = "3"
                response['response_message'] = "Failed to add new job to rabbitmq"
                response['data_dump'] = ""

    else:
        response['response_code'] = "1"
        response['response_message'] = "Fail"
        response['data_dump'] = ""

    return jsonify(response)

@app.route('/getDataOfRequestID', methods = ['GET'])
@cross_origin()
def get_data_of_stations():
    # Get parameters
    try:
        user_email = request.args.get('user_email')
        request_id = request.args.get('request_id')
        property = request.args.get('property')
    except:
        response = {
            "response_code" : "1",
            "response_message" : "Incorrect parameters passed for the query",
            "data" : []
        }
        return jsonify(response)

    # Make db helper call with request_id
    URL = "http://garudadbmiddleware:3001/getDataOfRequestID"
    METHOD = 'POST'
    PAYLOAD = json.dumps({
        "user_email" : str(user_email),
        "request_id" : str(request_id),
        "property" : str(property)
    })
    HEADERS = {
    'Content-Type': 'application/json'
    }
    db_response = api_request(METHOD, URL, header=HEADERS, data=PAYLOAD, response_type='json')
    # Take response
    if db_response == None:
        response = {
            "response_code" : "1",
            "response_message" : "Failed to get response from database service"
        }
        return jsonify(response)
    # Receive data
    response = {}
    if db_response['status'] == "success":
        response["response_code"] = "0"
        response["response_message"] = "Successfully fetched data"
        response["data"] = db_response['data']
    else:
        response["response_code"] = "1"
        response["response_message"] = db_response['message']
        response["data"] = db_response['data']

    return jsonify(response)

def main():
    app.run(host="0.0.0.0", port=5000)

if __name__ == "__main__":
    main()