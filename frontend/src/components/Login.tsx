import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse extends String {}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: LoginData = { email, password };

    try {
      const response = await axios.post('http://localhost:3000/users/login', loginData);
      const { token } = response.data;

      if (token) {
        // Store the token in localStorage or a state management solution
        localStorage.setItem('token', token);
        navigate('/home', { replace: true });
      } else {
        alert('Invalid email or password');
      }
    } catch (err:any) {
      console.error('Error during login:', err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message as string);
      } else {
        alert('An error occurred during login');
      }
    }
  };


  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-yellow-200 to-pink-200 min-h-screen">
      <div className="bg-white p-6 rounded-xl sm:w-1/3 w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-center sm:text-2xl">Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="emailInput" className="block font-bold mb-2">
              Email
            </label>
            <input
              id="emailInput"
              type="text"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
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
            Log in
          </button>
          <p className="text-center mb-2">Dont you have an account?</p>
        <Link
          className="block bg-white text-purple-500 py-3 rounded-md hover:bg-purple-100 transition-colors duration-300 text-center"
          to="/signup"
        >
          Sign up
        </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;