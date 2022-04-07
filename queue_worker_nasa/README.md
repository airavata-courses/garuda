# QUEUE_WORKER_NASA
The purpose of this microservice is to download merra dataset using authentication.
After downloading it converts the dataset into latitude and longitude using a formula and makes a call to DB_Writer to insert into the database.

## Run Module

> Note: Change Directory
```sh
cd queue_worker_nasa
```

1. Install Dependencies 
```sh
pip install -r requirements.txt
```

2. Run Worker
```sh
python worker.py
```
