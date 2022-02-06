# Base image
FROM maven:3.6.3-jdk-11

# LABEL about the custom image
LABEL maintainer="garuda"
LABEL version="1.0"
LABEL description="This is a docker image for the service data_extractor in the garuda project assignment 1"

WORKDIR /main

COPY . /main/
RUN mvn test
RUN mvn clean
RUN mvn assembly:single
RUN mvn install

EXPOSE 80 5000 3001 27017 5672 4369 15672

# CMD [ "python" , "/main/apigateway/server.py"]