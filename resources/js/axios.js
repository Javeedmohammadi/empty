// axiosInstance.js

import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

const setContentType = (contentType) => {
  axios.defaults.headers.post["Content-Type"] = contentType;
};

export { axios, setContentType };
