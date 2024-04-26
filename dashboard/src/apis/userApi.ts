import axiosClient from './axiosClient';

interface userApi {
  getUsers: (role: string | null) => Promise<any>;
}

const userApi: userApi = {
  getUsers: (role) => {
    const url = `/user?filters[role]=${role}`;
    return axiosClient.get(url);
  },
};

export default userApi;
