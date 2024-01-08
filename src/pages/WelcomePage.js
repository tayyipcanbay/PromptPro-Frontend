import React from 'react';
import './css/WelcomePage.css';
import { useNavigate } from 'react-router-dom';


function WelcomePage() {
    const navigate = useNavigate();
    return (
        <div className='animated-background'>
            <div className='welcome-body'>
                <h1 className="bouncing-text">Welcome to our website!</h1>
                <p className="bouncing-text">We're glad to have you here. Enjoy your stay!</p>
                <div className="welcome-button-container">
                    <button className="button" onClick={() => navigate('/login')}>Login</button>

                </div>
            </div>
        </div>
    );
}

export default WelcomePage;