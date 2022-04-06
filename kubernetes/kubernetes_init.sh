## rabbit mq resource ##
# setting up namespace for rabbitmq
kubectl create ns rabbits
kubectl apply -n rabbits -f rabbit-rbac.yaml
kubectl apply -n rabbits -f rabbit-configmap.yaml
kubectl apply -n rabbits -f rabbit-secret.yaml
kubectl apply -n rabbits -f rabbit-statefulset.yaml
# forwarding port of rabbitmq service
# kubectl -n rabbits port-forward rabbitmq-0 8080:15672

## metrics server ##
# prod
# kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
# local
kubectl apply -f metrics-server-deploy.yaml
# check deployment
# kubectl get deployment metrics-server -n kube-system

## dashboard ##
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.5/aio/deploy/recommended.yaml
# create service account
kubectl create serviceaccount dashboard-admin-sa
# add role
kubectl create clusterrolebinding dashboard-admin-sa --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin-sa

# opening dashboard
# kubectl get secrets
# kubectl describe secret <dashboard-admin-sa-token>
# kubectl proxy
# url: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login

## edit garuda_deploy file with env vairables
sed -i "s/{{AWS_ACCESS_KEY_ID}}/$AWS_ACCESS_KEY_ID/g" garuda_deploy.yaml
sed -i "s/{{AWS_SECRET_ACCESS_KEY}}/$AWS_SECRET_ACCESS_KEY/g" garuda_deploy.yaml

## garuda application ##
kubectl apply -f garuda_deploy.yaml

## Mongo DB cluster ##
echo "
================================
MONGO DB CLUSTERING
================================
Once mongodb stateful set is running, configure replica set.
Run the following commands to initialise replicaset:

1: Enter into first pod's shell
kubectl exec -it mongod-0 /bin/bash

2: Run mongo client
mongo

3: Initialise replica set
rs.initiate();

4: Configure replica set
rs.reconfig({\"_id\":\"MainRepSet\",\"version\":1,\"members\":[{\"_id\":0,\"host\":\"mongod-0.mongodb-service.default.svc.cluster.local:27017\"},{\"_id\":1,\"host\":\"mongod-1.mongodb-service.default.svc.cluster.local:27017\"},{\"_id\":2,\"host\":\"mongod-2.mongodb-service.default.svc.cluster.local:27017\"}]});

5: View replica set config
rs.config();

6: Exit moong client
exit

7. Exit shell
exit
"

## Cluster IP Address ##
echo "
================================================
Access your application on cluster node IP
================================================
1. Run following command to get IP address 
kubectl get nodes --output=wide
"

## View DashBoard ##
echo "
================================
View kubernetes dashboard
================================

1: Get all defined secrets
kubectl get secrets

2: Descibe dashboard user secret
kubectl describe secret <dashboard-admin-sa-token>

3: Run proxy
kubectl proxy

4: Access dashboard
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login
"

echo "

kubernetes initialisation completed...:)
"