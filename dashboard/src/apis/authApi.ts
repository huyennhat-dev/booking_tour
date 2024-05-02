import axiosClient from './axiosClient';

interface AuthApi {
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<any>;
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
};

export default authApi;
