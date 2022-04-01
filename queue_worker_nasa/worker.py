#!/usr/bin/env python
import pika
import sys
import os
from downloader import download_nasa_data
from extractor import extract_data
from data_poster import post_data
from constants import getConstants
import json

constants = getConstants()

def main():
    print("starting queue worker for nasa data....")
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
            print("recieved msg : {}".format(body))
            # extract request params
            request = json.loads(body)
            requestID = request['requestID']
            minlon = request["minlon"]
            maxlon = request["maxlon"]
            minlat = request["minlat"]
            maxlat = request["maxlat"]
            begTime = request["begTime"]
            endTime = request["endTime"]
            begHour = request["begHour"]
            endHour = request["endHour"]
            property = request["property"]

            # download nasa data set
            file_urls = download_nasa_data(
                property, minlon, maxlon, minlat, maxlat, begTime, endTime, begHour, endHour)
            print("fetch data complete...")
            # extract data
            extracted_data = extract_data(file_urls, property)
            # print(extracted_data)

            # post data
            for data in extracted_data:
                final_response = {}
                final_response['requestID'] = requestID
                final_response['data'] = data
                final_response['type'] = "nasa"
                post_data(final_response)
        except Exception as ex:
            print(str(ex))
            print("error in processing request... :(")

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
