import axios from 'axios';

const api = axios.create({
  baseURL: 'https://take-backend.herokuapp.com/api-docs/'
});

export default api;