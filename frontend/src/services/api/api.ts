import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7037/api', // Verifique se a sua porta é 5001 ou 5000
});

export default api;