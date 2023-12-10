// UserProfile.js

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from "./Card";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const response = await fetch('http://localhost:6001/api/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserData(result);
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Lastname: {userData.lastname}</p>
          <p>Mobile: {userData.mobile}</p>
          <p>Email: {userData.email}</p>
          <h3>Forms:</h3>
          {userData.forms && userData.forms.length > 0 ? (
            <div className="Cards">
              {userData.forms.map((item) => (
                <Card
                key={item._id}
                src={item.image}
                alt={item.username}
                heading={item.cause}
                personname={item.username}
                funddetails={item.estimatedAmount}
              />
              ))}
            </div>
          ) : (
            <p>No forms associated with the user.</p>
          )}
          <button onClick={()=>logout()}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
