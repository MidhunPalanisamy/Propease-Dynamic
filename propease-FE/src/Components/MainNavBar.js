import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Logo.png';
import './CSS/MainNavBar.css';
import GlowText from './GlowText';

const MainNavBar = () => {
    return (
        <nav className="main-nav"> 
            <div className="logo-container"> 
                <Link to="/">
                    <img src={Logo} alt="Logo" style={{ width: '178px', height: '58px' }} />
                </Link>
            </div>
            <ul className="nav-links"> 
                <li>
                    <Link to="/home">
                        <GlowText text='Home' />
                    </Link>
                </li>
                <li>
                    <Link to="/property"> 
                        <GlowText text='Property' />
                    </Link>
                </li>
                <li>
                    <Link to="/map">
                        <GlowText text='Map' />
                    </Link>
                </li>
                <li>
                    <Link to="/community"> 
                        <GlowText text='Community' />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default MainNavBar;