import React from "react";
import Button from "./Button";
import './CSS/Home.css';
import homeImage from '../Assets/bg.png';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1 className="home-txt1">Welcome to Propease</h1>
            <p className="home-txt2">The search is over. Find your dreams here</p>

            {/* Existing Property Button */}
            <Link to="/property" className="home-btn">
                <Button text="Go" />
            </Link>

            {/* NEW User Registration Button */}
            <Link to="/UserRegistration" className="home-btn user-reg-btn">
                <Button text="Register as User" />
            </Link>

            <img className="hmImg" src={homeImage} alt="Home" />
        </div>
    );
};

export default Home;
