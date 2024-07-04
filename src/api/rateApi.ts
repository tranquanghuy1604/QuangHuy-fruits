import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const rateApi = {
  async createRate(params: any) {
    const url = '/rate';
    return await apiClient.post(url, params);
  },
};

export const useMutationCreateRate = () => {
  return useMutation((params: any) => rateApi.createRate(params));
};

export default rateApi;
