import axios from "axios";
// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "https://api-belleza.onrender.com/api/v1";
// const BASE_URL = "http://34.131.223.22/api/v1";

/**
 * Create a reusable Axios instance
 * @param {Object} options
 * @param {Object} options.customHeaders - Additional headers to merge
 * @param {Object} options.customConfig - Additional Axios config
 */
const createApi = ({ customHeaders = {}, customConfig = {} } = {}) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    ...customConfig,
  });
};
/**
 * Generic GET request
 */
export const getHandler = async (
  url,
  headers = {},
  params = {},
  config = {}
) => {
  try {
    const api = createApi({ customHeaders: headers, customConfig: config });
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

/**
 * Generic POST request
 */
export const postHandler = async (
  url,
  data = {},
  headers = {},
  config = {}
) => {
  try {
    const api = createApi({ customHeaders: headers, customConfig: config });
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

/**
 * Generic PUT request
 */
export const putHandler = async (url, data = {}, headers = {}, config = {}) => {
  try {
    const api = createApi({ customHeaders: headers, customConfig: config });
    const response = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

/**
 * Generic DELETE request
 */
export const deleteHandler = async (url, headers = {}, config = {}) => {
  try {
    const api = createApi({ customHeaders: headers, customConfig: config });
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
