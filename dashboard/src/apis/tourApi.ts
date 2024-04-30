import { TOUR_TYPE } from '../types';
import axiosClient from './axiosClient';

interface tourApi {
  create: (data: TOUR_TYPE) => Promise<any>;
  getTours: () => Promise<any>;
  deleteTour: (id: string) => Promise<any>;
}

const tourApi: tourApi = {
  create: (data) => {
    const url = '/tour';
    return axiosClient.post(url, { ...data });
  },
  getTours: () => {
    const url = '/tour';
    return axiosClient.get(url);
  },
  deleteTour: (id) => {
    const url = `/tour/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourApi;
