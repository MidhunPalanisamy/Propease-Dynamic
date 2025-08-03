import React, { useState } from 'react';
import './CSS/Button.css';

const Button = ({ text}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
            <button
                className={`custom-button ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {text}
            </button>
        
    );
};

export default Button;