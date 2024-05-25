import Axios from 'axios';

const AppService = Axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

export default AppService;
