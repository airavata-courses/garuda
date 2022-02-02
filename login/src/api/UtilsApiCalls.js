import React, { useEffect, useState } from 'react';

function UtilsApiCalls(endpoint, requestBody = "") {
    //TODO: once we deploy the server get only the api name and append with domain as below
    //const domainName = "http://127.0.0.1:3001/"
    //const entireUrl = {domainName} + endpoint
    //console.log(entireUrl)
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(endpoint, {
            method: "POST",
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
    }, [])
    return { error, isLoaded, data };


}

export default UtilsApiCalls