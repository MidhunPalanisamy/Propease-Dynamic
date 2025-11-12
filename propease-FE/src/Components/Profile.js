import React from "react";
import "./CSS/Profile.css";


const Profile = () => {
    return (
        <div className="profile-container">
            <h1 className="profile-tittle">User Profile</h1>
            <div className="profile-details">
                <p className="prf-dt">User Name :</p>
                <br/>
                <p className="prf-dt">Gender    :</p>
                <br/>
                <p className="prf-dt">Mail      :</p>
            </div>
            


        </div>
    );
}

export default Profile;