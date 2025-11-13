import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Assets/Logo.png';
import './CSS/MainNavBar.css';
import GlowText from './GlowText';

const MainNavBar = () => {
    const { pathname } = useLocation();
    const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

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
                        <GlowText text="Home" active={isActive('/home')} />
                    </Link>
                </li>
                <li>
                    <Link to="/property"> 
                        <GlowText text="Property" active={isActive('/property')} />
                    </Link>
                </li>
                <li>
                    <Link to="/map">
                        <GlowText text="Map" active={isActive('/map')} />
                    </Link>
                </li>
                <li>
                    <Link to="/community"> 
                        <GlowText text="Community" active={isActive('/community')} />
                    </Link>
                </li>
                {/* <li>
                    <Link to="/profile"> 
                        <GlowText text="Profile" active={isActive('/profile')} />
                    </Link>
                </li> */}
            </ul>
        </nav>
    );
};

export default MainNavBar;