import axios from "axios";
import queryString from "query-string";
import requiresToken from "../../../../React/axios/axios-client/src/utils/requiresToken";
import getToken from "../../../../React/axios/axios-client/src/utils/tokenUtils";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  async (config) => {
    if (requiresToken(config.url!)) {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosClient;
