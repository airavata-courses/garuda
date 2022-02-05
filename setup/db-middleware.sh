# !/bin/bash

# node 16.13.2
# npm 8.1.2
# mongodb 5.0.6

sudo apt install -y curl gcc g++ make

curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt -y install nodejs

wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt update
sudo apt-get install -y gnupg
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org=5.0.6 mongodb-org-database=5.0.6 mongodb-org-server=5.0.6 mongodb-org-shell=5.0.6 mongodb-org-mongos=5.0.6 mongodb-org-tools=5.0.6
# sudo systemctl start mongod
