import axiosClient from './axiosClient';

export type userType = {
  email: string;
  username: string;
  phone_number: string;
  role: string;
  id_manager:number
};

interface userApi {
  getUsers: (role: string | null) => Promise<any>;
  addUser: (role: userType) => Promise<any>;
}

const userApi: userApi = {
  getUsers: (role) => {
    const url = `/user?filters[role]=${role}`;
    return axiosClient.get(url);
  },
  addUser: (data) => {
    const url = `/user`;
    return axiosClient.post(url, { ...data });
  },
};

export default userApi;
