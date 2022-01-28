import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <h2>Welcome to GARUDA</h2>
        <Login />
        <br />
        {/* <Logout />
        <br /> */}
    </div>
  );
}

export default App;
