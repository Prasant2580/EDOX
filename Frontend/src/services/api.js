import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token, password) =>
    api.post(`/auth/reset-password/${token}`, { password }),
};

export const notesAPI = {
  fetchNotes: () => api.get('/notes'),
  createNote: (formData) => api.post('/notes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateNote: (id, formData) => api.put(`/notes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default api;
