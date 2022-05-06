In your cluster master, do this for all nodes

` kubectl label nodes node_name custosServiceWorker="enabled"`


In your local or any other VM. do it with VM if fails in local
1. In the new instance run install maven and java using
    
    ```
    sudo apt install maven
    ```

2. Do docker login using 
    
    ```
    sudo docker login
    ```

3. Create a new ssh key with RSA format

    ```
    ssh-keygen -t rsa -b 4096 -m pem
    ```

4. Now copy the public key .pub file and copy it in the "authorized_keys" file of the MASTER node

5. Do the below steps in the new instance
    
```
git clone https://github.com/apache/airavata-custos.git
cd airavata-custos
git checkout develop
```

6. 
   A. Do the following changes in pom.xml file located in the root file

    ##### Deploying Custos Services
    1. <!-- 1. Environment  -->
    <spring.profiles.active>dev</spring.profiles.active>
    2.  <!-- 2. Vault root_token -->
        <vault.token>YOUR_ROOT_TOKEN_FROM_VAULT_JSON_FILE</vault.token>
    3.  <!-- 3. Below values are static -->
        <vault.scheme>http</vault.scheme>
        <vault.host>vault.vault.svc.cluster.local</vault.host>
        <vault.port>8200</vault.port>
        <vault.uri>http://vault.vault.svc.cluster.local:8200</vault.uri>
    4. <!-- 4. keycloak credentials --> 
    <!-- KEYCLOCK_PASSWORD can be found from the command while deploying keycloak  -->
    <!-- BASE64 format only -->
    <iam.dev.username>KEYCLOAK_USERNAME</iam.dev.username>
    <iam.dev.password>KEYCLOCK_PASSWORD_BASE64</iam.dev.password>
    <iam.staging.username>KEYCLOAK_USERNAME</iam.staging.username>
    <iam.staging.password>KEYCLOCK_PASSWORD_BASE64</iam.staging.password>
    5. <!-- 5. MySQL credentials -->
        <!-- Found while deploying MYSQL -->
        <spring.datasource.username>MYSQL_USERNAME</spring.datasource.username>
        <spring.datasource.password>MYSQL_PASSWORD</spring.datasource.password>
    6. <!-- 6. Docker username - add username to both the fields -->
        <!-- Same username which you logged in, in the above steps -->
        <docker.image.prefix>DOCKER_USERNAME</docker.image.prefix>
        <docker.image.repo>DOCKER_USERNAME</docker.image.repo>
    7. <!-- 7. Hostname (Master node) -->
    <!-- js-156-79.jetstream-cloud.org -->
    <host>MASTER_NODE_HOST</host>
    8. <!-- 8. Private key path generated in RSA format -->
        <!-- ssh-keygen -t rsa -b 4096 -m pem  -->
        <!-- Path in this instance -->
        <ssh.privatekey>/home/rishijain15/.ssh/id_rsa</ssh.privatekey>
    9. <!-- 9. Empty below parameter -->
        <ssh.passphrase></ssh.passphrase>
    10. <!-- 10.. Username of master node -->
        <ssh.username>rishijain15</ssh.username>

    B. Comment from line 225 - 249 in the following file

        custos-integration-services/tenant-management-service-parent/tenant-management-service/src/main/java/org/apache/custos/tenant/management/tasks/TenantActivationTask.java

    C. Change the following in the pom.xml file found in the following path

        custos-core-services/utility-services/custos-configuration-service/pom.xml

    D. Now change "iam.server.url" property in all the *-dev.properties and *-staging.properties file found in the following path
        custos-core-services/utility-services/custos-configuration-service/src/main/resources
       with the value found running the below commands in your MASTER node

        ```
        kubectl delete all --all -n ingress-nginx

        //wait for 20 - 30 seconds and then procceed
        kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/baremetal/deploy.yaml

        //wait for 20 - 30 seconds and then procceed, you will get a port in the next command, we will use this port associated with 443
        kubectl get svc -n ingress-nginx
        ```

        Using the port you found in the previous command construct your final URL which will placed in all the finals mentioned in the first line of this step
        https://MASTER_NODE_URL:PORT/auth/

        eg. https://js-156-79.jetstream-cloud.org:30367/auth/

        replace the new url in all the "iam.server.url" property in the files mentioned above


    E. If any of the command fails try with sudo 
   
    NOTE: make sure you have a custos folder in the home directory of the master node with 777 permission before running below commands

    -  Build code
        `mvn clean install -P container`

    - Push code images to repo
       `mvn dockerfile:push -P container`

    -  deploy artifacts
       `mvn antrun:run -P scp-to-remote`

    F. Once this is done check if all the services are deployed in the MASTER node using 
        kubectl get all --all-namespaces

        Everything will be running/ready except "deployment.apps/custos-messaging-core-service" which can be ignored      

        Also, run the following command in the MASTER node, you need to change path 
        ```
            helm install cluster-management-core-service /PATH/custos/artifacts/cluster-management-core-service-1.1-SNAPSHOT.tgz -n keycloak
            
            eg. helm install cluster-management-core-service /home/ssh_user/custos/artifacts/cluster-management-core-service-1.1-SNAPSHOT.tgz -n keycloak
        ``` 
        
    G. Now we have to deploy 2 service again in staging environment
        *** Redeploying service 1 - "iam-admin-core-service"
        1. In Master Node check the deployed service
            a. helm list -n custos --short 
            b. Uninstall iam-admin-core-service service using
               helm uninstall iam-admin-core-service -n custos
            c. You won't find "iam-admin-core-service" in the list if you run step a. command again
        2. In your INSTANCE VM from where we deployed all the services 
            a. change the environment in the root pom.xml file to "staging"
                1. <!-- 1. Environment  -->
                 <spring.profiles.active>staging</spring.profiles.active>
            b. Deploy iam-admin-core-service again (We will only deply this single service)
                1. Go to the following folder
                    /custos-core-services/iam-admin-core-service
                2. And run this commands again 
                       -  Build code
                        `mvn clean install -P container`

                      - Push code images to repo
                        `mvn dockerfile:push -P container`

                      -  deploy artifacts
                        `mvn antrun:run -P scp-to-remote`
        3. In Master Node check the deployed service
            a. helm list -n custos --short 
            You will find "iam-admin-core-service" in the list again

        *** Redeploying service 2 - "identity-core-service"
        1. In Master Node check the deployed service
            a. helm list -n custos --short 
            b. Uninstall identity-core-service service using
               helm uninstall identity-core-service -n custos
            c. You won't find "identity-core-service" in the list if you run step a. command again
        2. In your INSTANCE VM from where we deployed all the services 
            a. change the environment in the root pom.xml file to "staging" (Already there don't need to do it again)
                1. <!-- 1. Environment  -->
                 <spring.profiles.active>staging</spring.profiles.active>
            b. Deploy identity-core-service again (We will only deply this single service)
                1. Go to the following folder
                    /custos-core-services/identity-core-service
                2. And run this commands again 
                       -  Build code
                        `mvn clean install -P container`

                      - Push code images to repo
                        `mvn dockerfile:push -P container`

                      -  deploy artifacts
                        `mvn antrun:run -P scp-to-remote`

        3. In Master Node check the deployed service
            a. helm list -n custos --short 
            You will find "identity-core-service" in the list again

7. In any browser go to the URL we created in step 6-D. You will see the vault UI. Login using the root_token
    1. Create 'secret' named engine
        a. Click on 'Enable new engine'
        b. Select 'KV' option and do next 
        c. enter 'secret' in the path filed and select '1' in the version dropdown 
        d. click on enable engine
    2. Create 'resourcesecret' named engine
        a. Click on 'Enable new engine'
        b. Select 'KV' option and do next 
        c. enter 'resourcesecret' in the path filed and select '1' in the version dropdown 
        d. click on enable engine

8. Make an REST api call to 
    1. POST request to YOUR_HOST_NAME and endpoint - /tenant-management/v1.0.0/oauth2/tenant
    https://js-156-79.jetstream-cloud.org:30367/tenant-management/v1.0.0/oauth2/tenant
    2. In body pass json object
        {
            "client_name":"garuda",
            "requester_email":"rdjain@iu.edu",
            "admin_username":"rishabh",
            "admin_first_name":"Rishabh",
            "admin_last_name":"Jain",
            "admin_email":"rdjain@iu.edu",
            "contacts":["rishabh.jain53@gmail.com","email2@gmail.com"],
            "redirect_uris":["http://localhost:8080/callback*",
            "https://js-156-79.jetstream-cloud.org/callback*"],
            "scope":"openid profile email org.cilogon.userinfo",
            "domain":"https://js-156-79.jetstream-cloud.org",
            "admin_password":"shubham123",
            "client_uri":"https://js-156-79.jetstream-cloud.org",
            "logo_uri":"https://js-156-79.jetstream-cloud.org",
            "application_type":"web",
            "comment":"Custos super tenant for production"
        }
    3. Save the response of the received in the above step
   
9. Go to Vault UI again 
    a. Click on 'secret' you will find an entry 
    b. In custos folder edit the file and set superTenant to true
         "superTenant": true

10. Make one last REST api call
    1. POST request to YOUR_HOST_NAME and endpoint - /tenant-management/v1.0.0/status
         https://js-156-79.jetstream-cloud.org:30367/tenant-management/v1.0.0/status 
    2. With following body 

        {
        "client_id":"RECEIVED_IN_PREVIOUS_POST_REQUEST",
        "status":"ACTIVE",
        "super_tenant":true,
        "updatedBy":"admin_username   KEY_PASSED_IN_BODY_OF_PREVIOUS_REQUEST"
        }