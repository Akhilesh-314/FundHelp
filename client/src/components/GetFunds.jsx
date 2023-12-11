import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import details from './details';
const GetFunds = () => {
    const history = useHistory();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [image, setImage] = useState(null);
    const [cause, setCause] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [whatsappNumber, setWhatsappNumber] = useState(0);
    const [bankAccountHolder, setBankAccountHolder] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState(0);
    const [ifscCode, setIfscCode] = useState('');
    const [branch, setBranch] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('User is not logged in. Please log in to continue.');
            history.push('/login'); // Adjust the path based on your login route
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('image', image);
            formData.append('cause', cause);
            formData.append('isPrivate', isPrivate);
            formData.append('isPublic', isPublic);
            formData.append('whatsappNumber', whatsappNumber);
            formData.append('bankAccountHolder', bankAccountHolder);
            formData.append('ifscCode', ifscCode);
            formData.append('branch', branch);
            formData.append('estimatedAmount', estimatedAmount);

            const response = await fetch('http://localhost:6001/api/form/createForm', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.ok) {
                alert('Data stored successfully!');
                history.push('/donate');
            } else {
                alert('Failed to store data in the database');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className="getfunds">
            <div>
                <h1 className="main-heading">Why Get Funds?</h1>
            </div>
            <div className="card">
                <div className="align-card">
                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="nice-form-group">
                            <label>
                                <h2>Full Name</h2>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
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
                                <h2>Phone Number</h2>
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="nice-form-group">
                            <label>
                                <h2>Image</h2>
                            </label>
                            {/* <input type="file" name="image" onChange={handleFileChange} /> */}
                            <input
                                type="file"
                                placeholder="yout image"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="nice-form-group">
                            <label>
                                <h2>Enter Your Cause</h2>
                            </label>
                            <textarea
                                type="text"
                                name="cause"
                                placeholder="Start typing..."
                                value={cause}
                                onChange={(e) => setCause(e.target.value)}
                                rows={6}
                            />
                        </div>
                        <div className="nice-form-group">
                            <label>
                                <h2>Select Option</h2>
                            </label>
                            <div className="option-select"></div>
                            <label className="check-container">
                                <p>Get payment via DonateEase platform</p>
                                <input
                                    type="checkbox"
                                    name="isPublic"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <label className="check-container">
                                <p>Get payment privately (Donor contacts via WhatsApp)</p>
                                <input
                                    type="checkbox"
                                    name="isPrivate"
                                    checked={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        {isPrivate && (
                            <div>
                                <div className="nice-form-group mobile-details">
                                    <label>
                                        <h2>Enter WhatsApp number</h2>
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsappNumber"
                                        placeholder="Enter WhatsApp number"
                                        value={whatsappNumber}
                                        onChange={(e) => setWhatsappNumber(e.target.value)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <label className="check-container">
                                        <p>Same as Phone number</p>
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {isPublic && (
                            <div>
                                <div className="nice-form-group bank-details">
                                    <label>
                                        <h2>Enter your bank account details</h2>
                                    </label>
                                    <input
                                        type="text"
                                        name="bankAccountHolder"
                                        placeholder="Name of Account Holder"
                                        value={bankAccountHolder}
                                        onChange={(e) => setBankAccountHolder(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="bankAccountNumber"
                                        placeholder="Account Number"
                                        value={bankAccountNumber}
                                        onChange={(e) => setBankAccountNumber(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="ifscCode"
                                        placeholder="IFSC Code"
                                        value={ifscCode}
                                        onChange={(e) => setIfscCode(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="branch"
                                        placeholder="Branch"
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="nice-form-group">
                            <label>
                                <h2>Estimated amount</h2>
                            </label>
                            <input
                                type="text"
                                name="estimatedAmount"
                                placeholder="Enter estimated amount in Rs"
                                value={estimatedAmount}
                                onChange={(e) => setEstimatedAmount(e.target.value)}
                            />
                        </div>

                        <div className="nice-form-group">
                            <button className="fundraiser">Start a fundraiser for FREE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetFunds;
