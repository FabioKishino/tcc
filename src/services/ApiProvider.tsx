import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://tcc-2022-backend.herokuapp.com/ '
});


export default instance;