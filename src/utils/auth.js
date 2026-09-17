import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed'
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return { success: true, user: response.data.user || response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export const logoutUser = async () => {
  localStorage.removeItem('token');
  return { success: true };
};
