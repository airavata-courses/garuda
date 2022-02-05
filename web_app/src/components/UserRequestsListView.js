import React, { useEffect, useState } from 'react';
import UtilsApiCalls from '../api/UtilsApiCalls';
import '../ui_components/UserRequestsListView.css'
export default function UserRequestsListView() {

    //const apiURL = "http://127.0.0.1:5001/getAllStatus";

    const username = localStorage.getItem('userEmail');
    const requestBody = { "user_email": username }
    const apiURL = process.env.REACT_APP_POST_GET_ALL_REQUEST + "?user_email=" + username
    //API call
    const { data, error, isLoaded } = UtilsApiCalls(apiURL, "GET");
    const arrUserRequestHistory = data.request_details || 0

    //On click event handler method
    //Get Lat and long of the request
    function getRequestIdData(e, requestId, property){
        e.preventDefault();

        const apiURL =  process.env.REACT_APP_API_GATEWAY_ENDPOINT + '/' + process.env.REACT_APP_POST_GET_DATA_OF_REQUEST_ID + "?user_email=" + username + "&request_id=" + requestId + "&property=" + property

        document.getElementById('apiResponseMsg').innerHTML = "Processing your request"
        fetch(apiURL, {
            method: "GET",
        }).then(res => res.json())
        .then(
            (result) => {
                //result.data[].lat  result.data[].long
                console.log(result.data)
                document.getElementById('apiResponseMsg').innerHTML = "Map will be rendered soon"
            },
            (error) => {
                document.getElementById('apiResponseMsg').innerHTML = "Something went wrong! Please try again later!"
                console.log(error)
            }
        )
    }
    if (error !== null) {
        return <div>Error: {error.message}</div>;
      }
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if(arrUserRequestHistory == 0){
        return <div>no request found ...</div>;
    } else {
    return (
        <div className='divUserRequests'>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Sr no.</th>
                        <th>Station Name</th>
                        <th>Time</th>
                        <th>Property</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {
                        arrUserRequestHistory.map((eachRequest, index) => (
                            <tr key={index + 1}>
                                <td> {index + 1} </td>
                                <td> {eachRequest.user_email} </td>
                                <td> {eachRequest.user_email}  </td>
                                <td> {eachRequest.user_email} </td>
                                <td> {eachRequest.status === "1" ? 'Complete' : 'In Process'} </td>
                                <td>
                                    {eachRequest.status === "1" ? <button onClick={(e) => { getRequestIdData(e,eachRequest.request_id, eachRequest.property)}}>Show Map</button> : <button disabled >Show Map</button>}
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    }
}