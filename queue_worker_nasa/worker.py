from flask import Flask, jsonify, request
from downloader import download_nasa_data 
from extractor import extract_data

app = Flask(__name__)

# healthcheck API
@app.route('/ping', methods = ['GET'])
def ping():
    response = { "ping": "pong"}
    return jsonify(response)

@app.route('/download_data', methods = ['GET'])
def download_data():
    urls = download_nasa_data();
    return {"files": urls}

@app.route('/extract_data', methods = ['GET'])
def extractor():
    urls = download_nasa_data();
    extracted_data = extract_data(urls)
    return {"data": extracted_data}

def main():
    app.run(host="0.0.0.0", port=3001)

if __name__ == "__main__":
    main()