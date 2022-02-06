# Base image
FROM node:16

# LABEL about the custom image
LABEL maintainer="garuda"
LABEL version="1.0"
LABEL description="This is a docker image for the service db_middleware in the garuda project assignment 1"

WORKDIR /main

COPY . /main/

RUN npm install

CMD [ "npm" , "start"]
