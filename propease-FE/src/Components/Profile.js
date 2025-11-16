import React from "react";
import "./CSS/Profile.css";

const Profile = () => {

    // 🔥 Fetch user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!storedUser) {
        return <h2>No user logged in!</h2>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">User Profile</h1>

            <div className="profile-card">

                <div className="profile-image">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        alt="User Avatar"
                    />
                </div>

                <div className="profile-info">
                    <p><strong>User Name:</strong> {storedUser.name}</p>
                    <p><strong>Gender:</strong> {storedUser.gender}</p>
                    <p><strong>Email:</strong> {storedUser.email}</p>
                    <p><strong>Phone:</strong> {storedUser.phone}</p>
                    <p><strong>Role:</strong> {storedUser.role}</p>
                    <p><strong>Joined On:</strong> {storedUser.joinedOn || "Not Available"}</p>
                </div>
            </div>

            <div className="profile-actions">
                <button className="edit-btn">Edit Profile</button>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("loggedUser");
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
