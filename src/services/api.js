import axios from "axios";

// const api_url = {
//   baseURL: "http://192.168.0.115:3333",
// };

// const api_url = {
//   baseURL: " https://0f3dde32fd2d.ngrok.io/",
// };

const api_url = {
  baseURL: " https://api-promotores.inmes.com.br/",
};

const api = axios.create(api_url);

export default api;
