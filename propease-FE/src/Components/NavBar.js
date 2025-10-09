import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Logo.png';
import './CSS/NavBar.css';
import Button from './Button';
import GlowText from './GlowText';

const NavBar = () => {
    return (
        <nav className="Logo_Cont">
            <a href="/">
                <img src={Logo} alt="Logo" style={{ width: '178px', height: '58px' }} />
            </a>
            <Link to="/signup" className="signup-button">
                <Button text='Sign Up' />
            </Link>
            <Link to="/login" className='login-button'>
                <GlowText text='Login' />
            </Link>
        </nav>
    );
};

export default NavBar;