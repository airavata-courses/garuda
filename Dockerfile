#Download base image ubuntu 20.04
FROM ubuntu:20.04

# LABEL about the custom image
LABEL maintainer="garuda"
LABEL version="1.0"
LABEL description="This is a custom docker image for the garuda project assignment 1"

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

COPY apigateway /main/apigateway/
COPY data_extractor /main/data_extractor/
COPY db_middleware /main/db_middleware/
COPY queue_worker /main/queue_worker/
COPY setup /main/setup/

WORKDIR /main

RUN apt-get update && \
      apt-get -y install sudo

RUN sh /main/setup/apigateway.sh
RUN sh /main/setup/data-extractor.sh
RUN sh /main/setup/db-middleware.sh