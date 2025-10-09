import React, { useState } from 'react';
import './CSS/SignUp.css';
import Logo from '../Assets/Logo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState('none');

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (gender === 'none') {
            alert("Please select your gender.");
            return;
        }

        const username = event.target.username.value;
        const email = event.target.ml.value;
        const password = event.target.pwd.value;

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    gender
                })
            });

            if (response.ok) {
                console.log('Signup successful');
                navigate('/home');
            } else {
                alert('Signup failed. Try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    return (
        <div className='SignUp-Page'>
            <a href="/" className='Logo_Cont'>
                <img src={Logo} alt="Logo" style={{ width: '178px', height: '58px' }} />
            </a>
            <div className='SignUp-Container'>
                <form onSubmit={handleSignUp} name='signup'>
                    <center>
                        <h1 className='t2'>SignUp</h1>
                        <input className="sp-input" type='text' name='username' placeholder='Username' required /><br /><br />
                        <div className="gender-wrapper">
                            <span className="gender-title">Gender:</span>

                            <label className="gender-option">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={gender === 'Male'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <span className="checkmk"></span>
                                Male
                            </label>

                            <label className="gender-option">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={gender === 'Female'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <span className="checkmk"></span>
                                Female
                            </label>
                        </div><br /><br />
                        <input className="sp-input" type='email' name='ml' placeholder='Mail' required /><br /><br />
                        <input className="sp-input" type='password' name='pwd' placeholder='Password' required />
                    </center>
                    <p className='sp-txt'>Already have an account? <a style={{ color: "#E55642", textDecoration: "none" }} href="/login">Login</a></p>
                    <button className='sub-button' type="submit">
                        <Button text="Go" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;