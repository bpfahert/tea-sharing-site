import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import App from './App';
import UserInfo from './components/UserInfo';

export default function RouteSwitch() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/user" element={<UserInfo />} />
            </Routes>
        </BrowserRouter>
    );
}