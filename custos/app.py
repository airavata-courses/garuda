from flask import Flask, render_template, flash, redirect, url_for
import os
import json
import random, string

from custos.clients.user_management_client import UserManagementClient
from custos.clients.group_management_client import GroupManagementClient
from custos.clients.resource_secret_management_client import ResourceSecretManagementClient
from custos.clients.sharing_management_client import SharingManagementClient
from custos.clients.identity_management_client import IdentityManagementClient


from custos.transport.settings import CustosServerClientSettings
import custos.clients.utils.utilities as utl

from google.protobuf.json_format import MessageToJson
app = Flask(__name__)


class Garuda:
    def __init__(self) -> None:
        pass
    
    def create_user(self):
        pass

@app.route("/test")
def hello():
    return "I am alive!!!"

@app.route("/")
def index():
    # main()
    return render_template('index.html')


def main():
    try :
        # read settings
        custos_settings = CustosServerClientSettings(custos_host='custos.scigap.org',
                        custos_port='31499', 
                        custos_client_id='custos-wwiyeainy5iuqp8rf0dh-10003415',
                        custos_client_sec='NXiaLSa6mEA2RUl2XyCg2ZRlwTaq2xCvEMQUhP1K')
        # create custos resource secret client
        # create custos user management client
        user_management_client = UserManagementClient(custos_settings)

        # create custos group management client
        group_management_client = GroupManagementClient(custos_settings)

        # create custos resource secret client
        resource_secret_client = ResourceSecretManagementClient(custos_settings)

        # create sharing management client
        sharing_management_client = SharingManagementClient(custos_settings)

        # create identity management client
        identity_management_client = IdentityManagementClient(custos_settings)
        b64_encoded_custos_token = utl.get_token(custos_settings=custos_settings)

        created_groups = {}

        admin_user_name = "isjarana"
        admin_password = "IJR@circ@1"
        
        resource_ids = []
        print("Successfully configured all custos clients")
    except Exception as e:
        raise e
        print("Custos Id and Secret may wrong "+ str(e))

if __name__ == "__main__":
    main()
    app.run()