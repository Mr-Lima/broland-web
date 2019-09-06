import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5228',
});

export default api;
