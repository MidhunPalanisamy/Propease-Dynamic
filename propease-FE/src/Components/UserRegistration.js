import React, { useState } from "react";
import axios from "axios";
import "./CSS/UserRegistration.css";

const UserRegistration = () => {
    const [form, setForm] = useState({
        name: "",
        gender: "",
        email: "",
        phone: "",
        role: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/users/register", form)
            .then((res) => {
                alert("User registered successfully!");

                // 🔥 Save user data to localStorage
                localStorage.setItem("loggedUser", JSON.stringify(res.data));

                // Redirect to profile page
                window.location.href = "/profile";
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to register user");
            });
    };

    return (
        <div className="register-container">
            <h1 className="register-title">User Registration</h1>

            <form className="register-form" onSubmit={handleSubmit}>
                
                <label>User Type:</label>
                <select name="role" onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="TENANT">Tenant</option>
                    <option value="OWNER">Owner</option>
                    <option value="BUYER">Buyer</option>
                </select>

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    onChange={handleChange}
                    required
                />

                <label>Gender:</label>
                <select name="gender" onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                </select>

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                />

                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="register-btn">Submit</button>
            </form>
        </div>
    );
};

export default UserRegistration;
