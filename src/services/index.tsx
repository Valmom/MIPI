import axios from 'axios';

const api = axios.create({
  baseURL: "https://mipi.equatorialenergia.com.br/mipiapi/api/v1/"
});


export default api;