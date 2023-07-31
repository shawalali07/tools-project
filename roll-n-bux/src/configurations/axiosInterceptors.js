import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

export const api = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = token ? `Bearer ${token}` : "";
  return request;
});
