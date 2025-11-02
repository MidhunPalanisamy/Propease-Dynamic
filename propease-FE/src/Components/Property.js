import React, {useEffect, useState} from "react";
import Build from "../Assets/Build.png";
import "./CSS/Property.css";
import add from "../Assets/add.png";
import { Link } from "react-router-dom";


const Property = () => {
    const [property, setProperty] = useState([]);

    useEffect(()=>{
        loadProperty();
    },[]);

    const loadProperty = async () => {
        const response = await fetch("http://localhost:8080/api/allProperty");
        const data = await response.json();
        setProperty(data);
    }

    return (
        <div>
            <h1 className="prop-txt">Find Your Space</h1>
            <div className="property-container">
                {property.map((prop) => (
                    <div key={prop.id} className="property-card">
                        <img src={`http://localhost:8080/api/product/${prop.id}/image`} alt="Property" className="property-image" onError={(e) => { e.target.onerror = null; e.target.src = Build; }}/>
                        <div className="property-details">
                            <p className="property-address">{prop.address}</p>
                            <p className="property-contact">Contact: {prop.contact}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/addprop">
                <button className="addProp"><img className="addImg" src={add} height="20px" alt=""/>Add Property</button>
            </Link>
        </div>
    );
};

export default Property;