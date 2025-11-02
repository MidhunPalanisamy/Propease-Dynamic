import React, { useState } from 'react';
import './CSS/GlowText.css';

const GlowText = ({ text, active = false }) => {
    const [textHovered, setTextHovered] = useState(false);
    return (
        <div>
            <span
                className={`glow-text ${textHovered ? 'hovered' : ''} ${active ? 'active' : ''}`}
                onMouseEnter={() => setTextHovered(true)}
                onMouseLeave={() => setTextHovered(false)}
            >
                {text}
            </span>
        </div>
    );
}

export default GlowText;