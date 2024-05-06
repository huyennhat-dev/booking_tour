import { PARAM_TYPE, TOUR_TYPE } from '../types';
import axiosClient from './axiosClient';

interface tourApi {
  create: (data: TOUR_TYPE) => Promise<any>;
  update: (data: TOUR_TYPE, id: string) => Promise<any>;
  delete: (id: number) => Promise<any>;
  getTours: (params?: PARAM_TYPE) => Promise<any>;
  getTour: (id: string) => Promise<any>;
  getBookTours: () => Promise<any>;
  refundMoney: (id: number) => Promise<any>;
  getBookTourDetail: (id: string) => Promise<any>;
}

const tourApi: tourApi = {
  create: (data) => {
    const url = '/auth/tour';
    return axiosClient.post(url, { ...data });
  },
  update: (data, id) => {
    const url = `/auth/tour/${id}`;
    return axiosClient.put(url, { ...data });
  },
  delete: (id) => {
    const url = `/auth/tour/${id}`;
    return axiosClient.delete(url);
  },
  getTour: (id) => {
    const url = `/auth/tour/${id}`;
    return axiosClient.get(url);
  },
  getTours: (params) => {
    const url = '/auth/tour';
    return axiosClient.get(url, { params });
  },

  getBookTours: () => {
    const url = '/auth/book';
    return axiosClient.get(url);
  },
  refundMoney: (id) => {
    const url = `/auth/book/refund/${id}`;
    return axiosClient.put(url);
  },
  getBookTourDetail: (id) => {
    const url = `/auth/staff/tour-booking/${id}`;
    return axiosClient.get(url);
  },
};

export default tourApi;
