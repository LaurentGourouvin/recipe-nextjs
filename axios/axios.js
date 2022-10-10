import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = publicRuntimeConfig.API_URL;
axiosInstance.defaults.withCredentials = true;

export const getRequest = (url) => {
  return axiosInstance.get(`${url}`);
};

export const postRequest = (url, payload) => {
  return axiosInstance.post(`${url}`, payload);
};

export const patchRequest = (url, payload) => {
  return axiosInstance.patch(`${url}`, payload);
};

export const deleteRequest = (url) => {
  return axiosInstance.delete(`${url}`);
};

export default axiosInstance;
