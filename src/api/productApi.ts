import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const productApi = {
  getListProduct() {
    const url = '/product';
    return apiClient.get(url);
  },
  getProductByCategory(params: any) {
    const url = '/product/get-product-by-category';
    return apiClient.post(url, params);
  },
  getProduct(productId: any) {
    const url = `/product/${productId}`;
    return apiClient.get(url);
  },
  findProduct(productName: any) {
    const url = `product/list-product-by-condition`;
    return apiClient.post(url, productName);
  },
};

export const useQueryGetListProduct = () => {
  return useQuery(['list-product'], productApi.getListProduct);
};

export const useQueryGetProductByCategory = (params: any) => {
  return useQuery(['list-product-category', params], () => productApi.getProductByCategory(params), {
    enabled: !!params,
  });
};

export const useQueryGetProduct = (productId: any) => {
  return useQuery(['item-product', productId], () => productApi.getProduct(productId));
};
export const useMutationFindProduct = () => {
  return useMutation((productName: any) => productApi.findProduct(productName));
};

export default productApi;
