// Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Fetch user profile on component mount
    axios.get('http://localhost:3000/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setProfile(response.data))
    .catch(error => console.error('Error fetching profile:', error));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Add more profile fields as needed */}
    </div>
  );
};

export default Profile;