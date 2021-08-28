import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337/api/0.1/',
    timeout: 1000
  });

export default instance;