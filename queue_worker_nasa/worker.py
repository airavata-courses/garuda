#!/usr/bin/env python
import pika
import sys
import os
from downloader import download_nasa_data
from extractor import extract_data
from constants import getConstants
import json

constants = getConstants()


def main():
    creds = pika.PlainCredentials('guest', 'guest')
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host=constants['RABBITMQ_HOST'], port=constants['RABBITMQ_PORT'], virtual_host="/", credentials=creds)
    )
    channel = connection.channel()

    channel.queue_declare(queue=constants['RABBITMQ_QUEUE_NASA'])

    # method to run after getting msg
    def callback(ch, method, properties, body):
        try:
            print("message recieved : %s", body)
            # extract request params
            request = json.loads(body)
            minlon = request["minlon"]
            maxlon = request["maxlon"]
            minlat = request["minlat"]
            maxlat = request["maxlat"]
            begTime = request["begTime"]
            endTime = request["endTime"]
            begHour = request["begHour"]
            endHour = request["endHour"]

            # download nasa data set
            file_urls = download_nasa_data(
                minlon, maxlon, minlat, maxlat, begTime, endTime, begHour, endHour)
            # extract data
            extracted_data = extract_data(file_urls)
            # print(extracted_data)
            # TODO:: post data
        except:
            print("error in processing request :(")

    channel.basic_consume(
        queue=constants['RABBITMQ_QUEUE_NASA'], on_message_callback=callback, auto_ack=True)

    channel.start_consuming()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
