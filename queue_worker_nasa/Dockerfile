FROM python:3.8.13
ARG nasa_username
ARG nasa_password

WORKDIR /root
RUN touch .netrc
RUN echo "machine urs.earthdata.nasa.gov login ${nasa_username} password ${nasa_password}" > .netrc
WORKDIR /queue_worker_nasa
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN mkdir -p files
CMD python worker.py
