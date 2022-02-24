FROM python:3.8.10

WORKDIR /apigateway
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD python server.py
