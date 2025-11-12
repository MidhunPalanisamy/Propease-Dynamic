import React from "react";
import Button from "./Button";
import './CSS/Home.css';
import homeImage from '../Assets/bg.png';
import { Link } from "react-router-dom";
import mail from "../Assets/mail.png";

const Home = () => {
    return (
        <div>
            <h1 className="home-txt1">Welcome to Propease</h1>
            <p className="home-txt2">The search is over. Find your dreams here</p>
            <Link to="/property" className="home-btn"><Button text="Go" /></Link>
            <img className="hmImg" src={homeImage} alt="Home"/>
            <marquee className="scroll" behaviour="">Contact us at 
                <a href="mailto:2300033011@kluniversity.in"> <img style={{ width: '30px', height: '30px' }} src={mail} alt="mail" /></a>
                 to live your dreams!
            </marquee>
        </div>
    )
}

export default Home