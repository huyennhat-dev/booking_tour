import axiosClient from './axiosClient';

const uploadApi = {
  removePhoto: (photo: string) => {
    const url = '/upload';
    return axiosClient.get(url, { data: { photo } });
  },
};

export default uploadApi;
