FROM python:3.8.13

WORKDIR /queue_worker_nasa
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD python worker.py
