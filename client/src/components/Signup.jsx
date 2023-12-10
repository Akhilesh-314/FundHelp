import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
const GetFunds = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobile, setMobile] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:6001/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastname, mobile, email, password }),
            });

            if (response.status === 201) {
                alert('sign up successfully!');
                history.push('/login');
            } else {
                alert('Invalid Credentials!');
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="getfunds">
            <div>
                <h1 className="main-heading">Sign Up</h1>
            </div>
            <div className="card">
                <div className="align-card">
                    <form onSubmit={handleFormSubmit}>

                        <div className="nice-form-group">
                            <label>
                                <h2>Name</h2>
                            </label>
                            <input
                                type="text"
                                placeholder="your first naem"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="nice-form-group">
                            <label>
                                <h2>LastName</h2>
                            </label>
                            <input
                                type="text"
                                placeholder="your last name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="nice-form-group">
                            <label>
                                <h2>Mobile</h2>
                            </label>
                            <input
                                type="number"
                                placeholder="your number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
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
                            <button className="fundraiser">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetFunds;
