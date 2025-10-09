import React, { useState } from "react";
import "./CSS/AddProp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProp = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        address: "",
        email: "", 
        contact: "",
        latitude: "",
        longitude: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProperty({ ...property, [name]: value });
    };

    const handleImageChange = (e) => {
        setProperty({ ...property, image: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!/^\d{10}$/.test(property.contact)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const formData = new FormData();
        formData.append("imgD", property.image);
        formData.append("property", JSON.stringify({
            address: property.address,
            email: property.email,
            contact: property.contact,
            latitude: parseFloat(property.latitude),
            longitude: parseFloat(property.longitude)
        }));

        try {
            const response = await axios.post("http://localhost:8080/api/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Property added successfully:", response.data);
            alert("Property added successfully");
            navigate("/property");
        } catch (error) {
            console.error("Error adding property:", error);
            alert("Error adding property");
        }
    };

    return (
        <div className="addprop-page">
            <h1 className="addprop-txt">Add Property</h1>
            <div className="addprop-container">
                <form name="addp" className="addprop-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Property Address"
                        className="addprop-input"
                        name="address"
                        value={property.address}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="addprop-input"
                        name="email" 
                        value={property.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        className="addprop-input"
                        name="contact"
                        value={property.contact}
                        onChange={handleInputChange}
                        required
                        id="telp"
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        className="addprop-input"
                        name="latitude"
                        value={property.latitude}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        className="addprop-input"
                        name="longitude"
                        value={property.longitude}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="addprop-input"
                        name="imgD"
                        onChange={handleImageChange}
                        required
                    />
                    <button type="submit" className="addprop-button">
                        Add Property
                    </button>
                </form>
            </div>
            <br />
            <a href="/property" style={{ textDecoration: "none", color: "#ff7e5f" }}>
                Go Back
            </a>
        </div>
    );
};

export default AddProp;
