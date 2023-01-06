import axios from 'axios';
export const BASE_URL = 'https://fakestoreapi.com/';
export const request = axios.create({
  baseURL: BASE_URL,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

request.interceptors.request.use(
  async config => {
    // await local.getSession(result => {
    //   if (result?.userInfo?.tokens?.access?.token) {
    //     config.headers.Authorization =
    //       'Bearer ' + result?.userInfo?.tokens?.access?.token;
    //   }
    // });
    return config;
  },

  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  async error => {
    const {config, response} = error;
    if (
      response?.data?.error === 'Unauthenticated' ||
      response?.status == 401
    ) {
      try {
        console.log('API Response Unauthenticated');
        // await refreshToken();
        // userToken = null;
        // return request(config);
      } catch (err) {
        console.log('API => Interceptor => Response');
        console.log(err);
      }
    }
    return Promise.reject(error);
  },
);
