import time
from urllib import response
from flask import Flask, jsonify, request
import configparser
import os, json
import pymongo

app = Flask(__name__)

def log_error(err_code):
    if err_code == -1:
        print("Config file not found")
    elif err_code == -2:
        print("Config tab not found")
    elif err_code == -3:
        print("Status value not valid")
    

def read_config(status = 1):
    '''
    Input:
    status = 1 indicates reading configurations from satellite database
    status = 2 indicates reading configurations from status database
    Error codes:
    0 = Successful
    -1 = config file not found
    -2 = config tab not found
    -3 = status value not valid
    Return:
    error code = code for error
    config = A dictionary with db configuration values
    '''
    config = configparser.ConfigParser()
    conf_file = r'config'
    config.read(conf_file)
    if not os.path.exists(conf_file):
        return -1, None
    if status == 1:
        try:
            return 0, config['satellite-db']
        except:
            return -2, None
    elif status == 2:
        try:
            return 0, config['status-db']
        except:
            return -2, None
    else:
        return -3, None

def get_data_db(conf, key):
    '''
    Not tested, use docker image of mongodb to test method
    '''
    # url = f"mongodb://{conf['host']}:{conf['port']}"
    client = pymongo.MongoClient(
        f"{conf['host']}:{conf['port']}",
        username=conf['user'],
        password=conf['passwd'],
        authSource=conf['db']
    )
    db = client[conf['db']]
    # Enter collection name
    collection = db[key]
    result = collection.find_one()
    return result

@app.route("/fetch-data", methods = ['POST'])
def serve_request():
    error_code, config = read_config(1)
    if error_code != 0:
        log_error(error_code)
    
    return "It works!!!"

@app.route('/getAllInfo', methods = ['GET'])
def get_info_to_display():
    response = {
        "station_name" : ['DAN1', 'KABR', 'KABX', 'KAKQ', 'KAMA', 'KAMX', 'KAPX', 'KARX', 'KATX', 'KBBX', 'KBGM', 'KBHX', 'KBIS', 'KBLX', 'KBMX', 'KBOX', 'KBRO', 'KBUF', 'KBYX', 'KCAE', 'KCBW', 'KCBX', 'KCCX', 'KCLE', 'KCLX', 'KCRP', 'KCXX', 'KCYS', 'KDAX', 'KDDC', 'KDFX', 'KDGX', 'KDLH', 'KDMX', 'KDOX', 'KDTX', 'KDVN', 'KEAX', 'KEMX', 'KENX', 'KEOX', 'KEPZ', 'KESX', 'KEVX', 'KEWX', 'KEYX', 'KFCX', 'KFDR', 'KFFC', 'KFSD', 'KFSX', 'KFTG', 'KFWS', 'KGGW', 'KGJX', 'KGLD', 'KGRB', 'KGRK', 'KGRR', 'KGSP', 'KGWX', 'KGYX', 'KHDX', 'KHGX', 'KHNX', 'KHPX', 'KHTX', 'KICT', 'KICX', 'KILN', 'KILX', 'KIND', 'KINX', 'KIWA', 'KIWX', 'KJAX', 'KJGX', 'KJKL', 'KLBB', 'KLCH', 'KLGX', 'KLIX', 'KLNX', 'KLOT', 'KLRX', 'KLSX', 'KLTX', 'KLVX', 'KLWX', 'KLZK', 'KMAF', 'KMAX', 'KMBX', 'KMHX', 'KMKX', 'KMLB', 'KMOB', 'KMPX', 'KMQT', 'KMRX', 'KMSX', 'KMTX', 'KMUX', 'KMVX', 'KMXX', 'KNKX', 'KNQA', 'KOAX', 'KOHX', 'KOKX', 'KOTX', 'KPAH', 'KPBZ', 'KPDT', 'KPOE', 'KPUX', 'KRAX', 'KRGX', 'KRIW', 'KRLX', 'KRTX', 'KSFX', 'KSGF', 'KSHV', 'KSJT', 'KSOX', 'KSRX', 'KTBW', 'KTFX', 'KTLH', 'KTLX', 'KTWX', 'KTYX', 'KUDX', 'KUEX', 'KVNX', 'KVTX', 'KVWX', 'KYUX', 'PHKI', 'PHKM', 'PHMO', 'PHWA', 'TJUA'],
        "time" : ['00:00:00 - 00:29:59', '00:30:00 - 00:59:59', '01:00:00 - 01:29:59', '01:30:00 - 01:59:59', '02:00:00 - 02:29:59', '02:30:00 - 02:59:59', '03:00:00 - 03:29:59', '03:30:00 - 03:59:59', '04:00:00 - 04:29:59', '04:30:00 - 04:59:59', '05:00:00 - 05:29:59', '05:30:00 - 05:59:59', '06:00:00 - 06:29:59', '06:30:00 - 06:59:59', '07:00:00 - 07:29:59', '07:30:00 - 07:59:59', '08:00:00 - 08:29:59', '08:30:00 - 08:59:59', '09:00:00 - 09:29:59', '09:30:00 - 09:59:59', '10:00:00 - 10:29:59', '10:30:00 - 10:59:59', '11:00:00 - 11:29:59', '11:30:00 - 11:59:59', '12:00:00 - 12:29:59', '12:30:00 - 12:59:59', '13:00:00 - 13:29:59', '13:30:00 - 13:59:59', '14:00:00 - 14:29:59', '14:30:00 - 14:59:59', '15:00:00 - 15:29:59', '15:30:00 - 15:59:59', '16:00:00 - 16:29:59', '16:30:00 - 16:59:59', '17:00:00 - 17:29:59', '17:30:00 - 17:59:59', '18:00:00 - 18:29:59', '18:30:00 - 18:59:59', '19:00:00 - 19:29:59', '19:30:00 - 19:59:59', '20:00:00 - 20:29:59', '20:30:00 - 20:59:59', '21:00:00 - 21:29:59', '21:30:00 - 21:59:59', '22:00:00 - 22:29:59', '22:30:00 - 22:59:59', '23:00:00 - 23:29:59', '23:30:00 - 23:59:59'],
        "property_type" : ["reflectivity"]
    }
    # json_response = json.dumps(response)
    return jsonify(response)

@app.route('/getAllStatus', methods = ['GET'])
def get_user_job_status():
    userid = request.args.get('email_id')

    # Call db helper to fetch data for email_id
    # Get reponse from db helper

    response = {
        "request_details" : []
    }
    return response

@app.route('/postNewRequest', methods = ['POST'])
def generate_new_request():
    request_data = request.get_json()
    station_key = request_data['station_name']
    db_date = str(request_data['date']).strip().strip('-')
    time_start, time_end = str(request_data['time']).strip().strip(':').split('-')
    db_key = f"{station_key}_{db_date}_{time_start}_{time_end}"

    # Make call to check db for this key
    # Take response
    response_code = 0
    if response_code == 0:
        response_message = "Found"
    elif response_code == 1:
        response_message = "Not found"
    
    json_response = {
        "response_code" : response_code,
        "response_message" : response_message
    }
    return jsonify(json_response)

@app.route('/getDataOfRequestID', methods = ['GET'])
def get_data_of_stations():
    # Get parameters

    # Make db helper call
    # Receive data

    # Return data as json
    return 

def main():
    app.run(host="0.0.0.0", port=5000)

if __name__ == "__main__":
    main()