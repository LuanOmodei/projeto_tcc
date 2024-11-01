import axios from 'axios';

// Configura a URL base da API
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',  // URL do backend
});

export default api;
