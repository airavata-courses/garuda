import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import App from './App';


export const RouterDetails = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<App />}/> 
                <Route path="/Login" element={<App />}/> 
                <Route path="/Dashboard" element={<Dashboard />}/> 
            </Routes>
        </div>
    );
};
