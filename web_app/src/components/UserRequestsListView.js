import React from "react";
import UtilsApiCalls from "../api/UtilsApiCalls";
import "../ui_components/UserRequestsListView.css";
export default function UserRequestsListView({
  sendDataToParent,
  setLoadMapFalse,
}) {
  let CONST_NEXRAD = "nexrad";
  let CONST_MERRA = "nasa";
  //const apiURL = "http://127.0.0.1:5001/getAllStatus";
  var splitRequestId = [];
  var data_type;
  const username = localStorage.getItem("userEmail");
  const apiURL =
    process.env.REACT_APP_POST_GET_ALL_REQUEST + "?user_email=" + username;
  //API call
  const { data, error, isLoaded } = UtilsApiCalls(apiURL, "GET");
  //   const dummy_test = {
  //     "error_code": "0",
  //     "error_message": "Information retrieved",
  //     "request_details": [
  //       {
  //           "__v": 0,
  //           "_id": "62491f0a4b2b585adacba66d",
  //           "property": "Reflectivity",
  //           "request_id": "KAKQ_02072022_004800_005359_Reflectivity_nexrad",
  //           "status": "1",
  //           "time_stamp": "1648959242",
  //           "user_email": "rishabh.jain53@gmail.com"
  //       },
  //       {
  //           "__v": 0,
  //           "_id": "624924a0b512d9f62eb74a72",
  //           "property": "T",
  //           "request_id": "T_-3_4_-3_5_02-07-2022_02-14-2022_02:00_03:00_nasa",
  //           "status": "0",
  //           "time_stamp": "1648960672",
  //           "user_email": "rishabh.jain53@gmail.com"
  //       }
  //   ]
  // }
  const arrUserRequestHistory = data.request_details || 0;

  //On click event handler method
  //Get Lat and long of the request
  function getRequestIdData(e, requestId, property) {
    e.preventDefault();
    setLoadMapFalse();

    const host = REACT_APP_API_GATEWAY_HOST || "127.0.0.1";
    const port = REACT_APP_API_GATEWAY_PORT || "5000";
    const url = "http://" + host + "/" + port
    const apiURL = url + '/' + process.env.REACT_APP_POST_GET_DATA_OF_REQUEST_ID + "?user_email=" + username + "&request_id=" + requestId + "&property=" + property


    document.getElementById("apiResponseMsg").innerHTML =
      "Processing your request";
    fetch(apiURL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //result.data[].lat  result.data[].long
          console.log(result.data);
          sendDataToParent(result.data);
          document.getElementById("apiResponseMsg").innerHTML =
            "Map will be rendered soon";
        },
        (error) => {
          document.getElementById("apiResponseMsg").innerHTML =
            "Apologies! No data available on Nexrad!";
          console.log(error);
        }
      );
  }
  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (arrUserRequestHistory == 0) {
    return (
      <div className="divNoRequest">
        No requests found. Please submit a new request using above form.
      </div>
    );
  } else {
    return (
      <div className="divUserRequests">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Station Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Property</th>
              <th>Longitude Range</th>
              <th>Latitude Range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* T_100_180_-90_45_02-01-2022_02-05-2022_00:00_00:00_nasa */}
          <tbody>
            {arrUserRequestHistory.map(
              (eachRequest, index) => (
                (splitRequestId = eachRequest.request_id.split("_")),
                (data_type = splitRequestId[splitRequestId.length - 1]),
                (
                  <>
                    {data_type === CONST_NEXRAD ? (
                      <tr key={index + 1}>
                        <td> {index + 1} </td>
                        <td> {splitRequestId[0]} </td>
                        <td>
                          {" "}
                          {splitRequestId[1].slice(0, 2) +
                            "-" +
                            splitRequestId[1].slice(2, 4) +
                            "-" +
                            splitRequestId[1].slice(4)}{" "}
                        </td>
                        <td>
                          {" "}
                          {splitRequestId[2].slice(0, 2) +
                            ":" +
                            splitRequestId[2].slice(2, 4) +
                            ":" +
                            splitRequestId[2].slice(4) +
                            " - " +
                            splitRequestId[3].slice(0, 2) +
                            ":" +
                            splitRequestId[3].slice(2, 4) +
                            ":" +
                            splitRequestId[3].slice(4)}{" "}
                        </td>
                        <td> {splitRequestId[4]} </td>
                        <td> NA </td>
                        <td> NA </td>
                        <td>
                          {" "}
                          {eachRequest.status === "1"
                            ? "Complete"
                            : "In Process"}{" "}
                        </td>
                        <td>
                          {eachRequest.status === "1" ? (
                            <button
                              onClick={(e) => {
                                getRequestIdData(
                                  e,
                                  eachRequest.request_id,
                                  eachRequest.property
                                );
                              }}
                            >
                              Show Map
                            </button>
                          ) : (
                            <button disabled>Show Map</button>
                          )}
                        </td>
                      </tr>
                    ) : (
                      <tr key={index + 1}>
                        <td> {index + 1} </td>
                        <td> NA </td>
                        <td> {splitRequestId[5] + " - " + splitRequestId[6]} </td>
                        <td> {splitRequestId[7] + " - " + splitRequestId[8]} </td>
                        <td> {splitRequestId[0]} </td>
                        <td> {splitRequestId[1] + " to " + splitRequestId[2]} </td>
                        <td> {splitRequestId[3] + " to " + splitRequestId[4]} </td>
                        <td>
                          {" "}
                          {eachRequest.status === "1"
                            ? "Complete"
                            : "In Process"}{" "}
                        </td>
                        <td>
                          {eachRequest.status === "1" ? (
                            <button
                              onClick={(e) => {
                                getRequestIdData(
                                  e,
                                  eachRequest.request_id,
                                  eachRequest.property
                                );
                              }}
                            >
                              Show Map
                            </button>
                          ) : (
                            <button disabled>Show Map</button>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
