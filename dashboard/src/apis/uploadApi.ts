import axiosClient from './axiosClient';

const uploadApi = {
  removePhoto: (photo: string) => {
    const url = '/auth/upload';
    return axiosClient.delete(url, { data: { photo } });
  },
};

export default uploadApi;
