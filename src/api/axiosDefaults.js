import axios from 'axios';

// Set global defaults for axios
axios.defaults.baseURL = 'https://dfri-app-dc6e57a8e2dd.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create and export custom axios instances
export const axiosReq = axios.create();
export const axiosRes = axios.create();
