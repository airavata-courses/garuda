from flask import Flask, jsonify, request
import configparser
import os
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

@app.route("/fetch-data", methods = ['POST', 'GET'])
def serve_request():
    error_code, config = read_config(1)
    if error_code != 0:
        log_error(error_code)
    
    return "It works!!!"

def main():
    app.run(host="0.0.0.0", port=5000)

if __name__ == "__main__":
    main()