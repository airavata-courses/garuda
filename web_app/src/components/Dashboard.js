import React, { useEffect, useState } from "react";
import UserRequestForm from "./UserRequestForm";
import Logout from "./Logout";
import "react-datepicker/dist/react-datepicker.css";
import Card from "@material-ui/core/Card";
import "../ui_components/Dashboard.css";
import MapBox from "./MapBox";
import UserRequestsListView from './UserRequestsListView'

let data = {};

export default function Dashboard() {

  const [isLoadMap, setLoadMap] = useState(false);
  let obj = { latitude: [], longitude: [], reflectivity: [] };
  const sendDataToParent = (arrOfRequests) => { // the callback. Use a better name
    for(let i =0; i<arrOfRequests[0].lat.length; i++){
      let reflectivity = i
      for(let j =0; j<arrOfRequests[0].lat[i].length; j+=200){
        obj.latitude.push(arrOfRequests[0].lat[i][j]);
        obj.longitude.push(arrOfRequests[0].long[i][j]);
        obj.reflectivity.push(reflectivity)
      }
    }
    data = obj
    setLoadMap(true)
  };

  const setLoadMapFalse = () => { // the callback. Use a better name
    setLoadMap(false)
  };

  function submitUserRequest(e) {
    e.preventDefault();
    var vStationLocation = document.getElementById(
      "idDropdownStationLocation"
    ).value;
    var vDate = document.getElementById("idDatePickerComponent").value;
    var vTimeSlots = document.getElementById("idDropdownTimeSlots").value;
    var vMapProperty = document.getElementById("idDropdownMapProperty").value;
    var userEmail = localStorage.getItem("userEmail");

    if (vStationLocation === "default") {
      //alert("Please select station location")
      document.getElementById('apiResponseMsg').innerHTML = "Please select station location"
    } else if (vTimeSlots === "default") {
      //alert("Please select the time slot")
      document.getElementById('apiResponseMsg').innerHTML = "Please select the time slot"
    } else if (vMapProperty === "default") {
      //alert("Please select the property")
      document.getElementById('apiResponseMsg').innerHTML = "Please select the property"
    } else {

      var requestBody = {
        "station_name": vStationLocation,
        "date": vDate,
        "time": vTimeSlots,
        "user_email": userEmail,
        "property": vMapProperty
      }

      console.log("request body " + JSON.stringify(requestBody))
      var apiEndpoint = process.env.REACT_APP_API_GATEWAY_ENDPOINT + '/' + process.env.REACT_APP_POST_NEW_REQUEST
      console.group(apiEndpoint)
      // { 
      // “response_code” : “0” / ”1”,
      // “response_message” : “Success/Fail”, “data_dump” :””    }

      document.getElementById('apiResponseMsg').innerHTML = "Loading Please Wait! Submitting your request."
      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }).then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            //TODO: Parse the response and change the UI message accordingly
            if (result.response_code.localeCompare("0") == 0) {
              // Success
              document.getElementById('apiResponseMsg').innerHTML = result.response_message
            } else {
              // Error
              document.getElementById('apiResponseMsg').innerHTML = result.response_message
            }

          },
          (error) => {
            console.log(error)
            document.getElementById('apiResponseMsg').innerHTML = "Something went wrong! Please try again later."
          }
        )
    }

    //TODO: using
    //https://stackoverflow.com/questions/39260595/event-handlers-in-react-stateless-components
    //https://stackoverflow.com/questions/63436637/how-to-call-a-action-creator-in-a-functional-component-with-react-redux
    /*console.log(requestBody)
         const { data, error, isLoaded } = useCallback(() =>{
            dispatch(UtilsApiCalls("http://127.0.0.1:3001/postNewRequest", JSON.stringify(requestBody)));
         }) */
  }

  return (
    <div className="divMainDashboard">
      <div className="divLogout">
        <Logout />
      </div>
      <div className='divMainDashboardUserForm'>
        <Card className="cardUserRequestForm">
          <UserRequestForm />
          <div className="divSubmitButton">
            <button className="button" onClick={submitUserRequest} >
              Submit Request
            </button>
          </div>
          <div className="apiResponseMsg" id="apiResponseMsg" style={{ marginBottom: "20px" }}></div>
        </Card>
      </div>

      <div className='divMainDashboardUserRequests'>
        <UserRequestsListView sendDataToParent={sendDataToParent} setLoadMapFalse={setLoadMapFalse} />
      </div>
      
      <div className='divMainDashboardMap'>
        <Card>
          {isLoadMap && data && <MapBox data={data} />}
        </Card>
      </div>
    </div>
  );
}
