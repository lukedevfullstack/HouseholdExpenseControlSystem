import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Verifique a porta no seu Program.cs
});

export default api;