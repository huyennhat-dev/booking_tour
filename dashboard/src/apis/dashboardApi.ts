import axiosClient from './axiosClient';

const dashboardApi = {
  getAnalytics: () => {
    const url = '/auth/account/analytics';
    return axiosClient.get(url);
  },
};

export default dashboardApi;
