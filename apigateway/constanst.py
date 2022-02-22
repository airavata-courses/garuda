import os

def getConstants():

    constants = {}

    constants["APP_PORT"] = 5000
    if os.environ.get('APP_PORT') is not None:
        constants["APP_PORT"] = os.environ.get('APP_PORT')

    constants["DB_MIDDLEWARE_HOST"] = 'localhost'
    if os.environ.get('DB_MIDDLEWARE_HOST') is not None:
        constants["DB_MIDDLEWARE_HOST"] = os.environ.get('DB_MIDDLEWARE_HOST')
    
    constants["DB_MIDDLEWARE_PORT"] = '3001'
    if os.environ.get('DB_MIDDLEWARE_PORT') is not None:
        constants["DB_MIDDLEWARE_PORT"] = os.environ.get('DB_MIDDLEWARE_PORT')

    constants["RABBITMQ_HOST"] = 'localhost'
    if os.environ.get('RABBITMQ_HOST') is not None:
        constants["RABBITMQ_HOST"] = os.environ.get('RABBITMQ_HOST')

    constants["RABBITMQ_PORT"] = '5672'
    if os.environ.get('RABBITMQ_HOST') is not None:
        constants["RABBITMQ_PORT"] = os.environ.get('RABBITMQ_PORT')

    return constants

