
module.exports = {
    // add dev, prod and test env
    // user:pw@host1.com:27017,host2.com:27017,host3.com:27017
    DB_HOSTS: process.env.DB_HOSTS || 'localhost:27017',
    DB_DATABASE: process.env.DB_DATABASE || 'garuda_mongodb',
    DB_REPLICA_SET: process.env.DB_REPLICA_SET || 'MainRepSet',
    DB_REPLICA_SET_PREFERENCE: process.env.DB_REPLICA_SET_PREFERENCE || 'secondaryPreferred',

    // writer - 3001, reader - 3002
    APP_TYPE: process.env.APP_TYPE || 'writer',
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
    CONST_API_CALLBACK_KEY_REQUESTS: 'requests',

    CONST_DATA_SET_TYPE_NEXRAD : "nasa",
    CONST_DATA_SET_TYPE_MERRA : "merra"
}

