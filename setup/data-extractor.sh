# !/bin/bash

# Openjdk 11
# Maven

sudo apt update
# Install dependencies
sudo apt-get install -y build-essential libssl-dev
# Install Java JDK 11
sudo apt install -y openjdk-11-jdk 
# Set Java Home and Path
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
# Install Maven 
sudo apt install -y maven
# Set Maven path
export M2_HOME=/opt/maven
export MAVEN_HOME=/opt/maven
export PATH=${M2_HOME}/bin:${PATH}
