import React, { useState } from "react";
import UserRequestForm from "./UserRequestForm";
import Logout from "./Logout";
import "react-datepicker/dist/react-datepicker.css";
import Card from "@material-ui/core/Card";
import "../ui_components/Dashboard.css";
import MapBox from "./MapBox";
import UserRequestsListView from "./UserRequestsListView";
import MerraDataForm from "./MerraDataForm";

let data = {};
let CONST_NEXRAD = "nexrad";
let CONST_MERRA = "merra";
export default function Dashboard() {
  const [isLoadMap, setLoadMap] = useState(false);
  const [activeTab, setActiveTab] = useState(CONST_NEXRAD);

  let obj = { latitude: [], longitude: [], reflectivity: [] };
  let station = [];

  function refreshDashboard() {
    window.location.href =
      window.location.protocol + "//" + window.location.host + "/Dashboard";
  }

  const sendDataToParent = (response) => {
    // the callback

    station.push(response[0].station_longitude);
    station.push(response[0].station_latitude);

    for (let i = 0; i < response[0].lat.lat.length; i++) {
      for (let j = 0; j < response[0].lat.lat[i].length; j += 200) {
        obj.latitude.push(response[0].lat.lat[i][j]);
        obj.longitude.push(response[0].long.long[i][j]);
        obj.reflectivity.push(response[0].reflectivity.data[i][j]);
      }
    }

    data = { obj, station };
    setLoadMap(true);
  };

  const setLoadMapFalse = () => {
    // the callback. Use a better name
    setLoadMap(false);
  };

  function submitUserRequest(e) {
    e.preventDefault();
    var requestBody = null;

    if ({ activeTab } === { CONST_NEXRAD }) {
      requestBody = retrieveNexradFormData();
    } else {
      requestBody = retrieveMerraFormData();
    }
    if (requestBody){
      console.log("request body " + JSON.stringify(requestBody));
    var apiEndpoint =
      process.env.REACT_APP_API_GATEWAY_ENDPOINT +
      "/" +
      process.env.REACT_APP_POST_NEW_REQUEST;
    console.group(apiEndpoint);
    
    // {
    // “response_code” : “0” / ”1”,
    // “response_message” : “Success/Fail”, “data_dump” :””    }

    document.getElementById("apiResponseMsg").innerHTML =
      "Loading Please Wait! Submitting your request.";
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.response_code.localeCompare("0") == 0) {
            // Success
            document.getElementById("apiResponseMsg").innerHTML =
              result.response_message;
            setTimeout(() => {
              window.location.href =
                window.location.protocol +
                "//" +
                window.location.host +
                "/Dashboard";
            }, 2000);
          } else {
            // Error
            document.getElementById("apiResponseMsg").innerHTML =
              result.response_message;
          }
        },
        (error) => {
          console.log(error);
          document.getElementById("apiResponseMsg").innerHTML =
            "Something went wrong! Please try again later.";
        }
      );
    } else {
      console.log("CHECK THE SYSTEMMMMMMMMMMMMM")
    }
    
  }

  //TODO: using
  //https://stackoverflow.com/questions/39260595/event-handlers-in-react-stateless-components
  //https://stackoverflow.com/questions/63436637/how-to-call-a-action-creator-in-a-functional-component-with-react-redux
  /*console.log(requestBody)
         const { data, error, isLoaded } = useCallback(() =>{
            dispatch(UtilsApiCalls("http://127.0.0.1:3001/postNewRequest", JSON.stringify(requestBody)));
         }) */

  function retrieveNexradFormData() {
    var vStationLocation = document.getElementById(
      "idDropdownStationLocation"
    ).value;
    var vDate = document.getElementById("idDatePickerComponent").value;
    var vTimeSlots = document.getElementById("idDropdownTimeSlots").value;
    var vMapProperty = document.getElementById("idDropdownMapProperty").value;
    var userEmail = localStorage.getItem("userEmail");
    var requestBody = null;
    if (vStationLocation === "default") {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please select station location";
    } else if (vTimeSlots === "default") {
      //alert("Please select the time slot")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please select the time slot";
    } else if (vMapProperty === "default") {
      //alert("Please select the property")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please select the property";
    } else {
      requestBody = {
        station_name: vStationLocation,
        date: vDate,
        time: vTimeSlots,
        user_email: userEmail,
        property: vMapProperty,
        type: "nexrad"
      };
    }
    return requestBody;
  }

  function retrieveMerraFormData() {

    var localMinLong = document.getElementById("inMinLong").value;
    var localMaxLong = document.getElementById("inMaxLong").value;
    var localMinLat = document.getElementById("inMinLat").value;
    var localMaxLat = document.getElementById("inMaxLat").value;
    var localBeginDate = document.getElementById("idDatePickerBegin").value;
    var localEndDate = document.getElementById("idDatePickerEnd").value;
    var localStartTime = document.getElementById("idDropdownStartTime").value;
    var localEndTime = document.getElementById("idDropdownEndTime").value;
    var localMapProperty = document.getElementById("idDropdownMapProperty").value;
    var userEmail = localStorage.getItem("userEmail");
    var requestBody = null
    
    if (!localMinLong) {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please enter valid range for minimum longitude";
    } else if (!localMaxLong) {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please enter valid range for maximum longitude";
    } else if (!localMinLat) {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please enter valid range for minimum latitude";
    } else if (!localMaxLat) {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please enter valid range for maximum longitude";
    } else if (localStartTime === "default") {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please select the start time";
    } else if (localEndTime === "default") {
      //alert("Please select station location")
      document.getElementById("apiResponseMsg").innerHTML =
        "Please select the end time";
    } else {
      requestBody = {
        minlon: localMinLong,
        maxlon: localMaxLong,
        minlat: localMinLat,
        maxlat: localMaxLat,
        begTime: localBeginDate,
        endTime: localEndDate,
        begHour: localStartTime,
        endHour: localEndTime,
        property: localMapProperty,
        type: "nasa",
        user_email: userEmail,
      };
    }
    

    return requestBody
  }

  function handleTabSwitching(dataType) {
    setActiveTab(dataType);
  }

  return (
    <div className="divMainDashboard">
      <div className="divLogout">
        <Logout />
      </div>
      <div className="divMainDashboardUserForm">
        <Card className="cardUserRequestForm">
          <div className="formsTab">
            <ul className="formsTabNavBar">
              <li
                className={activeTab === CONST_NEXRAD ? "active" : ""}
                onClick={() => handleTabSwitching(CONST_NEXRAD)}
              >
                Nexard Data
              </li>
              <li
                className={activeTab === CONST_MERRA ? "active" : ""}
                onClick={() => handleTabSwitching(CONST_MERRA)}
              >
                Merra Data
              </li>
            </ul>
          </div>
          <div className="divFormToDisplay">
            <UserRequestForm id={CONST_NEXRAD} activeTab={activeTab} />
            <MerraDataForm id={CONST_MERRA} activeTab={activeTab} />
          </div>
          <div className="divSubmitButton">
            <button className="button" onClick={submitUserRequest}>
              Submit Request
            </button>
          </div>
          <div
            className="apiResponseMsg"
            id="apiResponseMsg"
            style={{ marginBottom: "20px" }}
          ></div>
        </Card>
      </div>

      <div className="divMainDashboardUserRequests">
        <button className="button" onClick={refreshDashboard}>
          Refresh List
        </button>
        <UserRequestsListView
          sendDataToParent={sendDataToParent}
          setLoadMapFalse={setLoadMapFalse}
        />
      </div>

      <div className="divMainDashboardMap">
        <Card>{isLoadMap && data && <MapBox data={data} />}</Card>
      </div>
    </div>
  );
}
