import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import MapComponent from './MapComponent';

interface MarkerData {
  lat: number;
  lng: number;
  BEZEICHNUNG: string;
  LEISTUNGEN: string;
  STRASSE?: string;
  PLZ?: string;
  ORT?: string;
  TELEFON?: string;
  EMAIL?: string;
  TRAEGER?: string;
  FILTER_CATEGORY: string;
  _id: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  favoriteMarkers: MarkerData[];
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [favoriteMarker, setFavoriteMarker] = useState<MarkerData | null>(null);

  const handleFavoriteMarkerChange = (marker: MarkerData) => {
    setFavoriteMarker(marker);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password)
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordMatch(false);
        return;
      }

      const updatedData = { name, email, password, favoriteMarkers: [favoriteMarker] };
      const response = await axios.put('http://localhost:3000/users/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserData(response.data);
      setIsEditing(false);
      setPasswordMatch(true);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
    setFavoriteMarker(null);
  };

  const handleConfirmDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:3000/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavoriteMarker(null);
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                passwordMatch ? 'border-gray-300' : 'border-red-500'
              } rounded-md focus:outline-none focus:ring-2 ${
                passwordMatch ? 'focus:ring-purple-500' : 'focus:ring-red-500'
              }`}
            />
            {!passwordMatch && (
              <p className="text-red-500 mt-2">Passwords do not match</p>
            )}
          </div>
          <Button onClick={handleSaveChanges} color="secondary" className="w-full mb-4">
            Save Changes
          </Button>
          <Button onClick={handleDeleteAccount} color="danger" className="w-full mb-4">
            Delete Account
          </Button>
        </div>
      ) : userData ? (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="mb-2">
            <strong>Password:</strong> {userData.password}
          </p>
          <p className="mb-2">
            <strong>Favorite Marker:</strong> {favoriteMarker ? favoriteMarker.BEZEICHNUNG : 'No favorite marker'}
          </p>
          <Button onClick={handleEditClick} color="secondary" className="w-full mb-4">
            Edit Profile
          </Button>
          <Button onClick={handleNavigateHome} color="primary" className="w-full mb-4">
            Go to Home
          </Button>
          <MapComponent onFavoriteMarkerChange={handleFavoriteMarkerChange} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Confirm Account Deletion</h3>
            <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowDeleteConfirmation(false)}
                color="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmDeleteAccount} color="danger">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;