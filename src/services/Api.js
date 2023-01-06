import {request} from './APIHandler';
export const API = {
  getAllProducts: () => request.get(`products?limit=${150}`),
};
