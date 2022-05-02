from flask import Flask, render_template, flash, redirect, url_for
import os
import json
import random, string
import requests

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

            self.created_groups = {}
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
            for x in respData['groups']:
                print(x['id'])
            # print(respData)
            return 1
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
            return 1
        except Exception as e:
            print(e)
            print("User allocation error")
            return 0
    
    def get_all_users_of_group(self, group):
        print(self.group_management_client.group_stub.getAllChildUsers)
        pass

    def test(self):
        # print(garuda.group_management_client.get_all_groups(garuda.b64_encoded_custos_token))
        print("I am still alive!!!")

@app.route("/test")
def hello():
    return "I am alive!!!"

@app.route("/")
def index():
    # main()
    global garuda
    garuda.test()
    groups = garuda.get_all_groups()
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
    return render_template('index.html')

def test_end_point():
    url = "https://dev.portal.usecustos.org/group-management/v1.0.0/groups"

    payload={}
    headers = {
    'Authorization': 'Basic base64(\'custos-wwiyeainy5iuqp8rf0dh-10003415:NXiaLSa6mEA2RUl2XyCg2ZRlwTaq2xCvEMQUhP1K\');'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text) 

# def 

def init():
    global garuda
    garuda = Garuda()

if __name__ == "__main__":
    # main()
    init()
    app.run()