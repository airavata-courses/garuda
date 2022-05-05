from flask import Flask, render_template, flash, redirect, url_for, request, jsonify
import os
import json
import random, string
import requests
from flask_cors import CORS, cross_origin

from custos.clients.user_management_client import UserManagementClient
from custos.clients.group_management_client import GroupManagementClient
from custos.clients.resource_secret_management_client import ResourceSecretManagementClient
from custos.clients.sharing_management_client import SharingManagementClient
from custos.clients.identity_management_client import IdentityManagementClient


from custos.transport.settings import CustosServerClientSettings
import custos.clients.utils.utilities as utl

from google.protobuf.json_format import MessageToJson
app = Flask(__name__)

global garuda
class Garuda:
    def __init__(self) -> None:
        try:
            # read settings
            self.custos_settings = CustosServerClientSettings(
                custos_host='custos.scigap.org',
                custos_port='31499', 
                custos_client_id='custos-wwiyeainy5iuqp8rf0dh-10003415',
                custos_client_sec='NXiaLSa6mEA2RUl2XyCg2ZRlwTaq2xCvEMQUhP1K'
            )
            # create custos resource secret client
            # create custos user management client
            self.user_management_client = UserManagementClient(self.custos_settings)

            # create custos group management client
            self.group_management_client = GroupManagementClient(self.custos_settings)

            # create custos resource secret client
            self.resource_secret_client = ResourceSecretManagementClient(self.custos_settings)

            # create sharing management client
            self.sharing_management_client = SharingManagementClient(self.custos_settings)

            # create identity management client
            self.identity_management_client = IdentityManagementClient(self.custos_settings)
            self.b64_encoded_custos_token = utl.get_token(custos_settings=self.custos_settings)
            # print(self.b64_encoded_custos_token)

            self.created_groups = {x['name'] : x['id'] for x in self.get_all_groups()}
            self.users = []

            self.admin_user_name = "isjarana"
            self.admin_password = "IJR@circ@1"
            
            self.resource_ids = []
            self.success_flag = True
        except Exception as e:
            self.success_flag = False
            raise e
            print("Custos Id and Secret may wrong "+ str(e))
        
    def register_users(self, user):
        try:
            self.user_management_client.register_user(token=self.b64_encoded_custos_token,
                                                username=user['username'],
                                                first_name=user['first_name'],
                                                last_name=user['last_name'],
                                                password=user['password'],
                                                email=user['email'],
                                                is_temp_password=False)
            self.user_management_client.enable_user(token=self.b64_encoded_custos_token, username=user['username'])
            self.users.append(user['username'])
            return 1
        except Exception:
            print("User may already exist")
            return 0
    
    def create_group(self, group):
        try:
            print("Creating group: " + group['name'])
            
            grResponse = self.group_management_client.create_group(token=self.b64_encoded_custos_token,
                                                            name=group['name'],
                                                            description=group['description'],
                                                            owner_id=group['owner_id'])
            resp = MessageToJson(grResponse)
            print(resp)
            respData = json.loads(resp)
            print("Created group id of "+ group['name'] + ": " +respData['id'] )
            self.created_groups[respData['name']] = respData['id']
            temp = Groups_Json()
            temp.write_groups(respData['name'], group['owner_id'])
            temp.save_json()
            del temp
            return 1
        except Exception as e:
            print(e)
            print("Group may be already created")
            return 0
    
    def get_all_groups(self):
        try:
            groups = self.group_management_client.get_all_groups(self.b64_encoded_custos_token)
            # for x in groups:
            #     print(x)
            resp = MessageToJson(groups)
            respData = json.loads(resp)
            # for x in respData['groups']:
            #     print(x['id'])
            # print(respData)
            return respData['groups']
        except:
            return 0

    def allocate_user_to_group(self, user, group):
        try:
            group_id = self.created_groups[group]
            print("Assigning user " + user + " to group " + group)
            val = self.group_management_client.add_user_to_group(token=self.b64_encoded_custos_token,
                                                    username=user,
                                                    group_id=group_id,
                                                    membership_type='Member'
                                                    )
            resp = MessageToJson(val)
            print(resp)
            temp = Groups_Json()
            temp.write_groups(group, user)
            temp.save_json()
            del temp
            return 1
        except Exception as e:
            print(e)
            print("User allocation error")
            return 0

    def doesUserExists(self, jsonobj):

        response = self.user_management_client.find_users(token=self.b64_encoded_custos_token, offset=0, limit=1,
                                                 username=jsonobj["username"])
        return response


    @DeprecationWarning
    def get_all_users_of_group(self, group):
        temp = Groups_Json()
        print(temp.read_groups()[group])
        del temp
        # print(self.group_management_client.group_stub.getAllChildUsers)
        pass


    #NOT WORKING IN POSTMAN
    # def get_all_users_of_a_group(self, jsonobj):

    #     url = "https://custos.scigap.org/group-management/v1.0.0/groups"

    #     payload={}
    #     headers = {
    #     'Authorization': 'Bearer '+str(garuda.b64_encoded_custos_token)
    #     }

    #     response = requests.request("GET", url, headers=headers, data=payload)

    #     print(response.text)


    def test(self):
        # print(garuda.group_management_client.get_all_groups(garuda.b64_encoded_custos_token))
        print("I am still alive!!!")

@app.route("/postRegisterNewUser", methods = ['POST'])
### Following JSON object required were all keys are mandatory
    #       {
    #           'username' : "rdjain",
    #           'first_name' : "Rishabh",
    #           'last_name' : "Jain",
    #           'password' : "Ri$#@bh",
    #           'email' : "rdjain@iu.edu"
    #       }
@cross_origin()
def postRegisterNewUser():
    try:
        request_data = request.get_json()
    except:
        response = {
            "response_code" : "2",
            "response_message" : "Request is not of type application/json"
        }
        return jsonify(response)

    try:
        global garuda
        return jsonify(garuda.register_users(request_data))

    except:
        response = {
            "response_code" : "-1",
            "response_message" : "something went wrong"
        }
        return jsonify(response)


@app.route("/postCreateNewGroup", methods = ['POST'])
### Following JSON object required were all keys are mandatory
    #   {
    #     'name' : "Garuda-test-1",
    #     'description' : "First test group for Garuda Custos",
    #     'owner_id' : "tsawaji"
    #   }
@cross_origin()
def postCreateNewGroup():
    try:
        request_data = request.get_json()
    except:
        response = {
            "response_code" : "2",
            "response_message" : "Request is not of type application/json"
        }
        return jsonify(response)

    try:
        global garuda
        return garuda.create_group(request_data)

    except:
        response = {
            "response_code" : "-1",
            "response_message" : "something went wrong"
        }
        return jsonify(response)


@app.route("/postAddUserToAGroup", methods = ['POST'])
### Following JSON object required were all keys are mandatory
    #   {
    #     'username' : "rdjain",
    #     'group_name' : "Garuda-test-1",
    #   }
@cross_origin()
def postAddUserToAGroup():
    try:
        request_data = request.get_json()
    except:
        response = {
            "response_code" : "2",
            "response_message" : "Request is not of type application/json"
        }
        return jsonify(response)

    try:
        
        global garuda
        # check doesUserExists response and add if else
        if garuda.doesUserExists(request_data):
            return jsonify(garuda.allocate_user_to_group(request_data["username"], request_data["group_name"]))
        else:
            response = {
            "response_code" : "3",
            "response_message" : "user does not exist"
        }
            return jsonify(response)
    except:
        response = {
            "response_code" : "-1",
            "response_message" : "something went wrong"
        }
        return jsonify(response)


@app.route('/getAllUsersOfAGroup', methods = ['POST'])
### Following JSON object required were all keys are mandatory
    #   {
    #     'group_name' : "Garuda-test-1",
    #   }
@cross_origin()
def getAllUsersOfAGroup():
    # Get parameters
    try:
        request_data = request.get_json()
    except:
        response = {
            "response_code" : "2",
            "response_message" : "Request is not of type application/json"
        }
        return jsonify(response)

    try:
        global garuda
        return garuda.get_all_users_of_a_group(request_data)
    except:
        response = {
            "response_code" : "-1",
            "response_message" : "something went wrong"
        }
        return jsonify(response)

@app.route('/getAllGroups', methods = ['GET'])
@cross_origin()
def getAllGroups():

    try:
        global garuda
        return jsonify(garuda.get_all_groups())
    except:
        response = {
            "response_code" : "-1",
            "response_message" : "something went wrong"
        }
        return jsonify(response)


@app.route("/test")
def hello():
    return "I am alive!!!"

@app.route("/")
def index():
    # main()
    global garuda
    garuda.test()
    # user = {
    #     'username' : "rdjain",
    #     'first_name' : "Rishabh",
    #     'last_name' : "Jain",
    #     'password' : "Ri$#@bh",
    #     'email' : "rdjain@iu.edu"
    # }
    # garuda.register_users(user)
    # garuda.get_all_groups()
    # garuda.allocate_user_to_group("rdjain", "Garuda-test-1")
    # groups = garuda.get_all_users_of_group("Garuda-test-1")
    # print(type(groups))
    # garuda.get_all_users_of_group("Garuda-test-1")
    # user = {
    #     'username' : "tsawaji",
    #     'first_name' : "Tanmay",
    #     'last_name' : "Sawaji",
    #     'password' : "t@nm@y",
    #     'email' : "tsawaji@iu.edu"
    # }
    
    # group = {
    #     'name' : "Garuda-test-1",
    #     'description' : "First test group for Garuda Custos",
    #     'owner_id' : "tsawaji"
    # }
    # garuda.register_users(user)
    # garuda.create_group(group)
    # test_end_point()
    # request_data = {
    #     'username' : 'fgdsagfgfdg'
    #     }
    # print(garuda.doesUserExists(request_data))
    return render_template('index.html')

def test_end_point():
    url = "https://dev.portal.usecustos.org/group-management/v1.0.0/groups"

    payload={}
    headers = {
    'Authorization': 'Basic base64(\'custos-wwiyeainy5iuqp8rf0dh-10003415:NXiaLSa6mEA2RUl2XyCg2ZRlwTaq2xCvEMQUhP1K\');'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text) 

class Groups_Json:
    def __init__(self) -> None:
        self.filename = "groups.json"
        fp = open(self.filename, 'r')
        self.groups = json.load(fp)
        fp.close()
    
    def read_groups(self):
        return self.groups

    def write_groups(self, group, user):
        if self.groups[group]:
            self.groups[group].append(user)
        else:
            self.groups[group] = [user]
    
    def save_json(self):
        with open(self.filename, 'w') as fp:
            json.dump(self.groups, fp)


def init():
    global garuda
    garuda = Garuda()

if __name__ == "__main__":
    # main()
    init()
    app.run()