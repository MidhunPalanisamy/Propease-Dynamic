import React,{useState} from 'react';
import './CSS/GlowText.css';

const GlowText = ({text})=>{
    const [textHovered, setTextHovered] = useState(false);
    return (
        <div>
            <text 
            className={`glow-text ${textHovered ? 'hovered':''}`}
            onMouseEnter={()=>setTextHovered(true)}
            onMouseLeave={()=>setTextHovered(false)}
            >{text}</text>
        </div>
    );
}

export default GlowText;