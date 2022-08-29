import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tcc-2022-backend.herokuapp.com/ '
});

export default api;