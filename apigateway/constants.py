import os

def getConstants():

    constants = {}

    constants["APP_PORT"] = 5000
    if os.environ.get('APP_PORT') is not None:
        constants["APP_PORT"] = os.environ.get('APP_PORT')

    constants["DB_MIDDLEWARE_WRITER_HOST"] = 'localhost'
    if os.environ.get('DB_MIDDLEWARE_WRITER_HOST') is not None:
        constants["DB_MIDDLEWARE_WRITER_HOST"] = os.environ.get('DB_MIDDLEWARE_WRITER_HOST')
    
    constants["DB_MIDDLEWARE_WRITER_PORT"] = '3001'
    if os.environ.get('DB_MIDDLEWARE_WRITER_PORT') is not None:
        constants["DB_MIDDLEWARE_WRITER_PORT"] = os.environ.get('DB_MIDDLEWARE_WRITER_PORT')

    constants["DB_MIDDLEWARE_READER_HOST"] = 'localhost'
    if os.environ.get('DB_MIDDLEWARE_READER_HOST') is not None:
        constants["DB_MIDDLEWARE_READER_HOST"] = os.environ.get('DB_MIDDLEWARE_READER_HOST')
    
    constants["DB_MIDDLEWARE_READER_PORT"] = '3002'
    if os.environ.get('DB_MIDDLEWARE_READER_PORT') is not None:
        constants["DB_MIDDLEWARE_READER_PORT"] = os.environ.get('DB_MIDDLEWARE_READER_PORT')

    constants["RABBITMQ_HOST"] = 'localhost'
    if os.environ.get('RABBITMQ_HOST') is not None:
        constants["RABBITMQ_HOST"] = os.environ.get('RABBITMQ_HOST')

    constants["RABBITMQ_PORT"] = '5672'
    if os.environ.get('RABBITMQ_PORT') is not None:
        constants["RABBITMQ_PORT"] = os.environ.get('RABBITMQ_PORT')

    return constants

