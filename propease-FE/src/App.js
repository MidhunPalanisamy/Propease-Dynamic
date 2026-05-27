import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Property from "./Components/Property";
import Map from "./Components/Map";
import AddProp from "./Components/AddProp";
import Community from "./Components/Community";
import Profile from "./Components/Profile";
import MainNavBar from "./Components/MainNavBar";
import OwnedProperties from './Components/OwnedProperties';

function Layout() {
  const location = useLocation();
  const excluded = ["/", "/login", "/signup", "/addprop"];
  const hideNav = excluded.includes(location.pathname);

  return (
    <>
      {!hideNav && <MainNavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/property" element={<Property />} />
        <Route path="/addprop" element={<AddProp />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/owned" element={<OwnedProperties />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;