import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const GetFunds = () => {
    const { setIsUserLoggedIn } = useAuth();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:6001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                alert('login successfully!');
                setIsUserLoggedIn(true);
                history.push('/getfunds');
            } else {
                setIsUserLoggedIn(false);
                alert('Invalid Credentials!');
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="getfunds">
            <div>
                <h1 className="main-heading">Login</h1>
            </div>
            <div className="card">
                <div className="align-card">
                    <form onSubmit={handleFormSubmit}>

                        <div className="nice-form-group">
                            <label>
                                <h2>Email</h2>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="nice-form-group">
                            <label>
                                <h2>Password</h2>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="nice-form-group">
                            <button className="fundraiser">Login</button>
                            <p>If not registered then, <Link to="/signup">SignUp!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetFunds;
