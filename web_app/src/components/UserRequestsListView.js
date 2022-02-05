import React from 'react';
import UtilsApiCalls from '../api/UtilsApiCalls';
import '../ui_components/UserRequestsListView.css'
export default function UserRequestsListView({ sendDataToParent, setLoadMapFalse }) {


    //const apiURL = "http://127.0.0.1:5001/getAllStatus";
    var splitRequestId = []
    const username = localStorage.getItem('userEmail');
    const apiURL = process.env.REACT_APP_POST_GET_ALL_REQUEST + "?user_email=" + username
    //API call
    const { data, error, isLoaded } = UtilsApiCalls(apiURL, "GET");
    const arrUserRequestHistory = data.request_details || 0

    //On click event handler method
    //Get Lat and long of the request
    function getRequestIdData(e, requestId, property) {
        e.preventDefault();
        setLoadMapFalse();
        const apiURL = process.env.REACT_APP_API_GATEWAY_ENDPOINT + '/' + process.env.REACT_APP_POST_GET_DATA_OF_REQUEST_ID + "?user_email=" + username + "&request_id=" + requestId + "&property=" + property

        document.getElementById('apiResponseMsg').innerHTML = "Processing your request"
        fetch(apiURL, {
            method: "GET",
        }).then(res => res.json())
            .then(
                (result) => {
                    //result.data[].lat  result.data[].long
                    console.log(result.data)
                    sendDataToParent(result.data)
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
    } else if (arrUserRequestHistory == 0) {
        return <div className='divNoRequest'>No requests found. Please submit a new request using above form.</div>;
    } else {
        return (
            <div className='divUserRequests'>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Station Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Property</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            arrUserRequestHistory.map((eachRequest, index) => (
                                splitRequestId = eachRequest.request_id.split('_'),
                                <tr key={index + 1}>
                                    <td> {index + 1} </td>
                                    <td> {splitRequestId[0]} </td>
                                    <td> {splitRequestId[1].slice(0, 2) + '-' + splitRequestId[1].slice(2, 4) + '-' + splitRequestId[1].slice(4)} </td>
                                    <td> {splitRequestId[2].slice(0, 2) + ':' + splitRequestId[2].slice(2, 4) + ':' + splitRequestId[2].slice(4) + ' - ' + splitRequestId[3].slice(0, 2) + ':' + splitRequestId[3].slice(2, 4) + ':' + splitRequestId[3].slice(4)} </td>
                                    <td> {splitRequestId[4]} </td>
                                    <td> {eachRequest.status === "1" ? 'Complete' : 'In Process'} </td>
                                    <td>
                                        {eachRequest.status === "1" ? <button onClick={(e) => { getRequestIdData(e, eachRequest.request_id, eachRequest.property) }}>Show Map</button> : <button disabled >Show Map</button>}
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