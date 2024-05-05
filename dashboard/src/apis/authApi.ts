import axiosClient from './axiosClient';

interface AuthApi {
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<any>;
  update: (data: any) => Promise<any>;

  getUser:()=>Promise<any>;
}

const authApi: AuthApi = {
  login: ({ email, password }) => {
    const url = '/auth/login';
    return axiosClient.post(url, { email, password });
  },
  logout: () => {
    const url = '/auth/logout';
    return axiosClient.post(url);
  },
  update: (data) => {
    const url = '/auth/account/update';
    return axiosClient.put(url, { ...data });
  },
  getUser:()=>{
    const url = '/auth/account/info';
    return axiosClient.get(url);
  }

};

export default authApi;
