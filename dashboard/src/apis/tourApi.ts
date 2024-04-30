import { PARAM_TYPE, TOUR_TYPE } from '../types';
import axiosClient from './axiosClient';

interface tourApi {
  create: (data: TOUR_TYPE) => Promise<any>;
  getTours: (params?: PARAM_TYPE) => Promise<any>;
  deleteTour: (id: string) => Promise<any>;
  getTour: (id: string) => Promise<any>;
}

const tourApi: tourApi = {
  create: (data) => {
    const url = '/auth/tour';
    return axiosClient.post(url, { ...data });
  },
  getTour: (id) => {
    const url = `/auth/tour/${id}`;
    return axiosClient.get(url);
  },
  getTours: (params) => {
    const url = '/auth/tour';
    return axiosClient.get(url, { params });
  },
  deleteTour: (id) => {
    const url = `/tour/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourApi;
