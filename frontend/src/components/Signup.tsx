import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupData: SignupData = { name, email, password };
    axios
      .post('http://localhost:3000/users', signupData)
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-yellow-200 to-pink-200 min-h-screen">
      <div className="bg-white p-6 rounded-xl sm:w-1/3 w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-center sm:text-2xl">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nameInput" className="block font-bold mb-2">
              Name
            </label>
            <input
              id="nameInput"
              type="text"
              autoComplete="off"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailInput" className="block font-bold mb-2">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="passwordInput" className="block font-bold mb-2">
              Password
            </label>
            <input
              id="passwordInput"
              type="password"
              autoComplete="off"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition-colors duration-300 mb-4"
          >
            Sign up
          </button>
        </form>
        <p className="text-center mb-2">Already have an Account?</p>
        <Link
          className="block bg-white text-purple-500 py-3 rounded-md hover:bg-purple-100 transition-colors duration-300 text-center"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;