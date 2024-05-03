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
};

export default homeApi;
