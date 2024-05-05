import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    const url = "/user/login";
    return axiosClient.post(url, { ...data });
  },
  logout: () => {
    const url = "/logout";
    return axiosClient.post(url);
  },
  register: (data) => {
    const url = "/user/signIn";
    return axiosClient.post(url, { ...data });
  },
  update: (data) => {
    const url = "/user/update";
    return axiosClient.put(url, { ...data });
  },
};

export default authApi;
