import axios from 'axios';

const httpClient = axios.create({
  withCredentials: true,
});

export default httpClient;