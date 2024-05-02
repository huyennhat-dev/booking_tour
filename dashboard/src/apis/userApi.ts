import { ACCOUNT_TYPE, PARAM_TYPE } from '../types';
import axiosClient from './axiosClient';

interface userApi {
  getAllUser: (params?: PARAM_TYPE) => Promise<any>;
  getAllAccount: (params?: PARAM_TYPE) => Promise<any>;
  addUser: (role: ACCOUNT_TYPE) => Promise<any>;
  getStaff: (params?: PARAM_TYPE) => Promise<any>;
}

const userApi: userApi = {
  getStaff: (params) => {
    const url = `/auth/staff`;
    return axiosClient.get(url, { params });
  },
  getAllAccount: (params) => {
    const url = `/auth/account`;
    return axiosClient.get(url, { params });
  },
  getAllUser: (params) => {
    const url = `/auth/user`;
    return axiosClient.get(url, { params });
  },
  addUser: (data) => {
    const url = `/auth/account/create`;
    return axiosClient.post(url, { ...data });
  },
};

export default userApi;
