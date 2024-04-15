import { params } from "../../../../React/axios/axios-client/src/utils/type";
import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params: params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
};

export default productApi;
