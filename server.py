from flask import Flask, jsonify
import configparser

app = Flask(__name__)

def read_config(status = 1):
    '''
    status = 1 indicates reading configurations from satellite database
    status = 2 indicates reading configurations from status database
    '''
    config = configparser.ConfigParser()
    conf_file = r'config'
    config.read(conf_file)
    if status == 1:
        return config['satellite-db']
    elif status == 2:
        return config['status-db']
    else:
        return None

@app.route("/fetch-data")
def serve_request():
    config = read_config(1)
    print(config['user'])
    return "It works!!!"

def main():
    app.run(host="0.0.0.0", port=5000)

if __name__ == "__main__":
    main()