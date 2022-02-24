
module.exports = {
    // add dev, prod and test env
    DB_HOSTNAME: process.env.DB_HOSTNAME || 'localhost',
    DB_PORT: process.env.DB_PORT || 27017,
    DB_DATABASE: process.env.DB_DATABASE || 'garuda_mongodb',

    APP_PORT: process.env.APP_PORT || 3001,

    CONST_REQUEST_STATUS_IN_PROCESS: '0',
    CONST_REQUEST_STATUS_COMPLETE: '1',
    CONST_REQUEST_STATUS_ERROR: '2',

    //Not used as of now
    CONST_API_CALLBACK_KEY_STATUS: 'status',
    CONST_API_CALLBACK_KEY_STATUS_SUCCESS: 'success',
    CONST_API_CALLBACK_KEY_STATUS_ERROR: 'error',
    CONST_API_CALLBACK_KEY_MESSAGE: 'message',
    CONST_API_CALLBACK_KEY_IS_NEW_REQUEST: 'is_new_reqeust',
    CONST_API_CALLBACK_KEY_REQUESTS: 'requests'
}

