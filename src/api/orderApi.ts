import { useMutation } from 'react-query';
import apiClient from './apiClient';

const orderApi = {
  async createOrder(params: any) {
    const url = '/order';
    return await apiClient.post(url, params);
  },
};

export const useMutationCreateOrder = () => {
  return useMutation((params: any) => orderApi.createOrder(params));
};

export default orderApi;
