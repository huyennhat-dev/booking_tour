import axiosClient from './axiosClient';
type tourType = {
  name_tour: string;
  initial_price: number;
  departure_day: string;
  end_tour_day: string;
  promotional: number;
  destination: string;
  vehicle: string;
  id_staff: number;
  id_manager: number;
  meal: boolean;
  insurance: boolean;
  photos: string[];
  introduce: string;
  highlight: string;
};
interface tourApi {
  create: (data: tourType) => Promise<any>;
}

const tourApi: tourApi = {
  create: (data) => {
    const url = '/tour';
    return axiosClient.post(url, { ...data });
  },
};

export default tourApi;
