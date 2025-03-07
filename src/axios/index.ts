import axios from "axios";

export declare interface Props {
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  params?: object;
  url?: string;
}

export const axiosServiceInstance = axios.create();

export const axiosService = (props: Props) => {
  const url = props.url;
  return axiosServiceInstance({
    ...props,
    url,
  });
};

axiosServiceInstance.interceptors.request.use(
  (request) => {
    request.baseURL = "http://localhost:3000";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServiceInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);
