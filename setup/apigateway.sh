# !/bin/bash

# Python 3.8.10
# rabbitmq

sudo apt update
sudo apt install -y software-properties-common curl apt-transport-https
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt install -y python3.8 python3.8-dev

wget -O- https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo apt-key add -
echo "deb https://packages.erlang-solutions.com/ubuntu focal contrib" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.deb.sh | sudo bash
sudo apt update
sudo apt install -y erlang
sudo apt install -y rabbitmq-server
sudo systemctl enable rabbitmq-server
