import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Card from "@material-ui/core/Card";

function App() {
  return (
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
  );
}

export default App;
