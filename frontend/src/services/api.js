import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
});

export default api;
