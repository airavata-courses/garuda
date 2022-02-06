# Base image
FROM python:3.8

# LABEL about the custom image
LABEL maintainer="garuda"
LABEL version="1.0"
LABEL description="This is a docker image for the service apigateway in the garuda project assignment 1"

WORKDIR /main

COPY . /main/
RUN pip install -r /main/requirements.txt

CMD [ "python" , "/main/server.py"]