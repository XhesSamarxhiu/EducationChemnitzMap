import React from 'react';
import { Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../assets/userIcon.png';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header flex justify-between items-center p-4 bg-[#E6F1FE] text-blue">
      <h1 className="text-2xl font-bold sm:text-2xl">Map Application</h1>
      <div className="flex flex-col sm:flex-row">
        {token ? (
          <div className="flex items-center">
            <button
              onClick={() => navigate('/profile')}
              className="mr-2"
            >
              <img
                src={userIcon} // Use the imported variable
                alt="User Icon"
                className="w-8 h-8 rounded-full"
              />
            </button>
            <Button color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login" className="mb-2 sm:mb-0 sm:mr-2">
            <Button color="success" className="mr-2">
              Log in
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
