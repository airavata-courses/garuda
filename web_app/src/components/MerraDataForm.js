import React, { useState } from "react";
import DatePicker from "react-datepicker";
function SecondTab({ id, activeTab }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let data = {
    KEY_START_TIME: ["00:00", "01:00", "02:00","03:00", "04:00", "05:00","06:00", "07:00", "08:00","09:00", "10:00", "11:00","12:00", "13:00", "14:00","15:00", "16:00", "17:00","18:00", "19:00", "20:00","21:00", "22:00", "23:00"],
    KEY_END_TIME: ["00:00", "01:00", "02:00","03:00", "04:00", "05:00","06:00", "07:00", "08:00","09:00", "10:00", "11:00","12:00", "13:00", "14:00","15:00", "16:00", "17:00","18:00", "19:00", "20:00","21:00", "22:00", "23:00"],
    PROPERTY: ["T"],
  };
  return activeTab === id ? renderForm() : renderEmpty();

  function renderEmpty() {
    return null;
  }

  function renderForm() {
    return (
      <div className="SecondTab">
        <div>
          <input
            type="number"
            placeholder="minimum longitude -180 to 180"
            id="inMinLong"
            style = {{width:"210px"}}
          />
          <input
            type="number"
            placeholder="maximum longitude -180 to 180"
            id="inMaxLong"
            style = {{width:"210px"}}
          />
          <input
            type="number"
            placeholder="minimum latitude -90 to 90"
            id="inMinLat"
            style = {{width:"180px"}}
          />
          <input
            type="number"
            placeholder="maximum latitude -90 to 90"
            id="inMaxLat"
            style = {{width:"180px"}}
          />
          <br></br>
          <span className="spanBeginDate">
            Start Date
            <DatePicker
              id="idDatePickerBegin"
              selected={startDate}
              onChange={(startDate) => setStartDate(startDate)}
              dateFormat="MM-dd-yyyy"
            />
          </span>
          <span className="spanBeginDate">
            End Date
            <DatePicker
              id="idDatePickerEnd"
              selected={endDate}
              onChange={(endDate) => setEndDate(endDate)}
              dateFormat="MM-dd-yyyy"
            />
          </span>
          <span className="spanDropdownStartTime">
            <select id="idDropdownStartTime">
              <option value="default">Select Start Time</option>
              {data["KEY_START_TIME"]?.map((startTime) => (
                <option value={startTime} key={startTime}>
                  {startTime}
                </option>
              ))}
            </select>
          </span>
          <span className="spanDropdownEndTime">
            <select id="idDropdownEndTime">
              <option value="default">Select End Time</option>
              {data["KEY_END_TIME"]?.map((stopTime) => (
                <option value={stopTime} key={stopTime}>
                  {stopTime}
                </option>
              ))}
            </select>
          </span>
          <span className="spanDropdownMapProperty">
            <select id="idDropdownMapProperty">
              <option value="default">Select Property</option>
              {data["PROPERTY"]?.map((mapProperty) => (
                <option value={mapProperty} key={mapProperty}>
                  Temperature
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    );
  }
}
export default SecondTab;

// {
//     "minlon": 100,
//     "maxlon": 180,
//     "minlat": -90,
//     "maxlat": -45,
//     "begTime": "2021-01-02",
//     "endTime": "2021-01-03",
//     "begHour": "00:00",
//     "endHour": "00:00",
//     "user_email": "test@iu.edu",
//     "property": "T",
//     "type": "nasa"
// }
