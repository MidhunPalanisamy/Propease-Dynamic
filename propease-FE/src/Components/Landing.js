import React from 'react';
import NavBar from './NavBar';
import Img from '../Assets/image.png';
import './CSS/Landing.css';

const Landing = ()=>{
    return (
        <div>
            <NavBar/>
            <img className='Ln-image' src={Img} alt="" />
            <text className='Ln-heading'>PROPEASE</text>
            <text className='Ln-subt'>Live Your Dream</text>
        </div>
    )
}

export default Landing;
