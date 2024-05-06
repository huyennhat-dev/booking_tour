import axiosClient from "./axiosClient";

const homeApi = {
  getHomeData: () => {
    const url = "/tour";
    return axiosClient.get(url);
  },
  getSearchData: (params) => {
    const url = "/tour/search";
    return axiosClient.get(url, { params });
  },
  getTour: (id) => {
    const url = `/auth/tour/${id}`;
    return axiosClient.get(url);
  },
  getBookTours:()=>{
    const url = `/auth/book`;
    return axiosClient.get(url);
  },
  bookTour: (data) => {
    const url = `/payment/book`;
    return axiosClient.post(url, { ...data });
  },
  cancelTour: (data) => {
    const url = `/auth/book/cancel-tour`;
    return axiosClient.put(url, { ...data });
  },
};

export default homeApi;
