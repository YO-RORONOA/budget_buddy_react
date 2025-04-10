import api from './api';

const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const register = async (name, email, password, password_confirmation) => {
  return api.post('/register', {
    name,
    email,
    password,
    password_confirmation,
  });
};
