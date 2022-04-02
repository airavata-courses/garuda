import os

def getConstants():

    constants = {}

    constants["DB_MIDDLEWARE_WRITER_HOST"] = 'localhost'
    if os.environ.get('DB_MIDDLEWARE_WRITER_HOST') is not None:
        constants["DB_MIDDLEWARE_WRITER_HOST"] = os.environ.get('DB_MIDDLEWARE_WRITER_HOST')
    
    constants["DB_MIDDLEWARE_WRITER_PORT"] = '3001'
    if os.environ.get('DB_MIDDLEWARE_WRITER_PORT') is not None:
        constants["DB_MIDDLEWARE_WRITER_PORT"] = os.environ.get('DB_MIDDLEWARE_WRITER_PORT')

    constants["RABBITMQ_HOST"] = 'localhost'
    if os.environ.get('RABBITMQ_HOST') is not None:
        constants["RABBITMQ_HOST"] = os.environ.get('RABBITMQ_HOST')

    constants["RABBITMQ_PORT"] = '5672'
    if os.environ.get('RABBITMQ_PORT') is not None:
        constants["RABBITMQ_PORT"] = os.environ.get('RABBITMQ_PORT')

    constants["RABBITMQ_QUEUE_NASA"] = 'offload_queue_nasa'
    if os.environ.get('RABBITMQ_QUEUE_NASA') is not None:
        constants["RABBITMQ_QUEUE_NASA"] = os.environ.get('RABBITMQ_QUEUE_NASA')

    return constants

