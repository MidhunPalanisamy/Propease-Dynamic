import React from "react";
import Button from "./Button";
import './CSS/Home.css';
import homeImage from '../Assets/bg.png';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-txt1">Welcome to Propease</h1>
            <p className="home-txt2">The search is over. Find your dreams here</p>

            {/* Navigation Buttons */}
            <div className="home-nav-buttons">
                <Link to="/property" className="home-btn">
                    <Button text="🏘️ Explore Properties" />
                </Link>
                <Link to="/owned" className="home-btn">
                    <Button text="🔑 My Properties" />
                </Link>
            </div>

            <img className="hmImg" src={homeImage} alt="Home" />
        </div>
    );
};

export default Home;
