import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import config from '../configuration/config.js';

const Auth = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:${config.backendPort}/auth/register`,
        {
          username,
          password,
        }
      );
      setUsername('');
      setPassword('');
      alert(`${response.data.message}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='p-4 border border-gray-300 rounded'>
      <h2 className='text-lg font-semibold mb-4'>Register</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>
            UserName :
          </label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className='border border-gray-300 rounded px-3 py-1 w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-1'>
            Password :
          </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='border border-gray-300 rounded px-3 py-1 w-full'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Register
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:${config.backendPort}/auth/login`,
        {
          username,
          password,
        }
      );
      setUsername('');
      setPassword('');
      if (response.data.message !== 'success') {
        alert(response.data.message);
      } else {
        setCookie('access_token', response.data.token);
        window.localStorage.setItem('userId', response.data.userId);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='p-4 border border-gray-300 rounded'>
      <h2 className='text-lg font-semibold mb-4'>Login</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>
            UserName :
          </label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className='border border-gray-300 rounded px-3 py-1 w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-1'>
            Password :
          </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='border border-gray-300 rounded px-3 py-1 w-full'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
