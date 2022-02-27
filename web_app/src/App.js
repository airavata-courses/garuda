import React,{useState} from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Card from "@material-ui/core/Card";
import AppContext from './components/AppContext';

function App() {
  const [globalUserName, setGlobalUserName] = useState("")
  
  const fnSetGlobalUserName = (username) =>{
    console.log("yuppy called")
    setGlobalUserName(username)
  }
  const fnGetGlobalUserName = () => {
    return globalUserName
  }
  const listOfGlobalVariables = {
    fnSetGlobalUserName,
    fnGetGlobalUserName,
  }

  return (
    <AppContext.Provider value={listOfGlobalVariables}>
    <div className="App">
      <Card>
        <h2>Welcome to GARUDA portal</h2>
        <h5>Please Login to proceed</h5>
          <Login />
          <br />
          {/* <Logout />
          <br /> */}
      </Card>
        
    </div>
    </AppContext.Provider>
  );
}

export default App;
