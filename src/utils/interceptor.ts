import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, TOKEN } from "../constants";

const request = axios.create({
  baseURL: BASE_URL,
});

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// set token on request headers
request.interceptors.request.use((config: any) => {
  const token = Cookies.get(TOKEN);
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// handle 401 and logout
request.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      // remove cookies here and refresh
      Cookies.remove(TOKEN);
      window.location.reload();
    }
    throw err;
  },
);

export default request;
