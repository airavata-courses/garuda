# !/bin/bash

# Install pip dependencies
pip3 install -r apigateway/requirements.txt

# Build data_extractor
cd data_extractor
mvn test
mvn clean
mvn assembly:single
mvn install
cd ..

# Build queue_worker
cd queue_worker
mvn clean
mvn compile assembly:single

