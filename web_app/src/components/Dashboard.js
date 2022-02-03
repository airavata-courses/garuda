import React, {  } from "react";
import UserRequestForm from "./UserRequestForm";
import Logout from "./Logout";
import "react-datepicker/dist/react-datepicker.css";
import Card from "@material-ui/core/Card";
import "../ui_components/Dashboard.css";

export default function Dashboard() {
  function submitUserRequest(e) {
    e.preventDefault();
    var vStationLocation = document.getElementById(
      "idDropdownStationLocation"
    ).value;
    var vDate = document.getElementById("idDatePickerComponent").value;
    var vTimeSlots = document.getElementById("idDropdownTimeSlots").value;
    var vMapProperty = document.getElementById("idDropdownMapProperty").value;
    var userEmail = localStorage.getItem("userEmail");
    //TODO: validations
    var requestBody = {
      station_name: vStationLocation,
      date: vDate,
      time: vTimeSlots,
      property_type: vMapProperty,
      user_email: userEmail,
    };

    //TODO: display response on ui
    fetch("http://127.0.0.1:3001/postNewRequest", {
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );

    //TODO: using
    //https://stackoverflow.com/questions/39260595/event-handlers-in-react-stateless-components
    //https://stackoverflow.com/questions/63436637/how-to-call-a-action-creator-in-a-functional-component-with-react-redux
    /*console.log(requestBody)
         const { data, error, isLoaded } = useCallback(() =>{
            dispatch(UtilsApiCalls("http://127.0.0.1:3001/postNewRequest", JSON.stringify(requestBody)));
         }) */
  }

  return (
    <div>
      <Card className="cardUserRequestForm">
        <UserRequestForm />
        <div className="divSubmitButton">
          <button onClick={submitUserRequest}>Submit Request</button>
        </div>
      </Card>
      <Card className="logout">
        <Logout />
      </Card>
    </div>
  );
}
