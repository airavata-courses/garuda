import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import UtilsApiCalls from '../api/UtilsApiCalls';
import '../ui_components/UserRequestForm.css';

export default function UserRequestForm() {
    //JSON response keys
    const KEY_STATION_NAME = 'station_name'
    const KEY_TIME_SLOTS = 'time'
    const KEY_PROPERTY_TYPE = 'property_type'

    const [startDate, setStartDate] = useState(new Date());

    const apiURL = "https://61f4496d10f0f7001768c8d1.mockapi.io/getLocation";
    //const apiURL = "http://127.0.0.1:3001/todos";

    //API call
    const { data, error, isLoaded } = UtilsApiCalls(apiURL);

    if (error !== null) {
        return <div>Error: {error.message}</div>;
      }
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
           
            <div className = "UserRequestForm">
                <span className = "spanDropdownLocation" > 
                    <select id = "idDropdownStationLocation">
                        <option value = "default">Select Station Name</option>
                        {data[KEY_STATION_NAME]?.map(station => (
                            <option value = {station} key={station}> {station} </option>
                        ))}
                    </select>
                </span>

                <span className = "spanDatePicker" >
                    <DatePicker 
                    id = "idDatePickerComponent"
                    selected={startDate} />
                </span>
                
                <span className = "spanDropdownTimeSlots"  > 
                <select id = "idDropdownTimeSlots">
                    <option value = "default">Select Time Slot</option>
                    {data[KEY_TIME_SLOTS]?.map(timeSlot => (
                        <option value = {timeSlot} key={timeSlot}> {timeSlot} </option>
                    ))}
                </select>
                </span>
                <span className = "spanDropdownMapProperty">
                <select  id = "idDropdownMapProperty">
                    <option value = "default">Select Property</option>
                    {data[KEY_PROPERTY_TYPE]?.map(mapProperty => (
                        <option value = {mapProperty} key={mapProperty}> {mapProperty} </option>
                    ))}
                </select>
                </span>
                
            </div>

        );
    }
}