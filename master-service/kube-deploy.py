from flask import Flask, request
import subprocess

app = Flask(__name__)

KEY = "5uIMp9PS2lOKFWfMGNGtmhKZYZKTeDTJ"

@app.route('/test')
def test_service():
    return "I am alive..."

@app.route('/ci', methods=["POST"])
def do_ci():
    request_data = request.get_json()
    key = request_data['key']
    if key == KEY:
        # Execute the script 
        subprocess.call(['sh', '$HOME/ci-services/pull-ci.sh'])
        return "OK"
    else:
        return "FAIL"