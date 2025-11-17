import React from 'react';
import './CSS/Login.css';
import Logo from '../Assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = event.target.mID.value.trim();
        const password = event.target.pwd.value.trim();

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            console.log('Response status:', response.status);
            console.log('Response data:', data);

            if (response.ok && data.userId) {
                // Store userId in localStorage
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('email', email);
                console.log('Login successful, userId:', data.userId);
                alert('Login successful!');
                navigate('/home');
            } else {
                console.error('Login failed:', data.message);
                alert(data.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='login-Page'>
            <a href="/" className='Logo_Cont'>
                <img src={Logo} alt="Logo" style={{ width: '178px', height: '58px' }} />
            </a>
            <div className="login-Container">
                <form onSubmit={handleLogin}>
                    <center>
                        <h1 className='t1'>LOGIN</h1>
                        <input 
                            className='input-Fields' 
                            type='email' 
                            name='mID' 
                            placeholder='Mail ID' 
                            required 
                        /><br /><br /><br />
                        <input 
                            className='input-Fields' 
                            type='password' 
                            name='pwd' 
                            placeholder='Password' 
                            required 
                        />
                    </center>
                    <p className='dha'> Don't have an account?<a href='/signup' style={{ color: "#E55642", textDecoration: "none" }}>SignUp</a></p>
                    <button className='sub-button' type="submit">
                        <Button text="Go" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;