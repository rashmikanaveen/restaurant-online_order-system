import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;



/*

const axiosInstance = axios.create({
  baseURL: 'http://192.168.227.198:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
*/