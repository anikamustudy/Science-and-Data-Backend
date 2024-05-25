import React, { useState } from 'react';
import AppService from '../services/api';
import { useNavigate } from 'react-router-dom';

import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await AppService.post('/login', formData);
      localStorage.setItem('token', response.data.data.token);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
