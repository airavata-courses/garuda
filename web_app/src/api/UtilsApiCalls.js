import React, { useEffect, useState } from 'react';

function UtilsApiCalls(endpoint, requestType = "POST", requestBody = "") {
    //TODO: once we deploy the server get only the api name and append with domain as below
    const host = REACT_APP_API_GATEWAY_HOST || "127.0.0.1";
    const port = REACT_APP_API_GATEWAY_PORT || "5000";
    const domainName = "http://" + host + "/" + port
    const entireUrl = domainName + '/' + endpoint
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        //POST
        if (requestType === "POST") {
            fetch(entireUrl, {
                method: requestType,
                body: requestBody
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setData(result)
                        setIsLoaded(true);
                        console.log(result)
                    },
                    (error) => {
                        setError(error)
                        setIsLoaded(false);
                        console.log(error)
                    }
                )
        } else {
            //GET
            fetch(entireUrl, {
                method: requestType
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setData(result)
                        setIsLoaded(true);
                        console.log(result)
                    },
                    (error) => {
                        setError(error)
                        setIsLoaded(false);
                        console.log(error)
                    }
                )
        }

    }, [])
    return { error, isLoaded, data };


}

export default UtilsApiCalls