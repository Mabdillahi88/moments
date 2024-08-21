import axios from 'axios';

axios.defaults.baseURL = 'https://dfri-app-dc6e57a8e2dd.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;
