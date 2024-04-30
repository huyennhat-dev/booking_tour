import axiosClient from './axiosClient';

interface AuthApi {
  login: (credentials: { email: string; password: string }) => Promise<any>;
}

const authApi: AuthApi = {
  login: ({ email, password }) => {
    const url = '/auth/login';
    return axiosClient.post(url, { email, password });
  },
};

export default authApi;
