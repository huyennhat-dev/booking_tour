import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    const url = "/login";
    return axiosClient.post(url, { ...data });
  },
  logout: () => {
    const url = "/logout";
    return axiosClient.post(url);
  },
  register: (data) => {
    const url = "/sign_in";
    return axiosClient.post(url, { ...data });
  },
  update:(data)=>{
    const url = "/update";
    return axiosClient.put(url, { ...data });
  }
};

export default authApi;
