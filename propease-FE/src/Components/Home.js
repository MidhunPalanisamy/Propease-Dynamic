import React from "react";
import MainNavBar from "./MainNavBar";
import Button from "./Button";
import './CSS/Home.css';
import homeImage from '../Assets/bg.png';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <MainNavBar />
            <h1 className="home-txt1">Welcome to Propease</h1>
            <p className="home-txt2">The search is over. Find your dreams here</p>
            <Link to="/property" className="home-btn"><Button text="Go" /></Link>
            <img className="hmImg" src={homeImage} alt="Home"/>
        </div>
    )
}

export default Home