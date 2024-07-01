import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const promotionApi = {
  getAllPromotion() {
    const url = '/promotion';
    return apiClient.get(url);
  },
  getPromotion(promotionId: any) {
    const url = `/promotion/${promotionId}`;
    return apiClient.get(url);
  },
};

export const useQueryGetAllPromotion = () => {
  return useQuery(['list-promotion'], promotionApi.getAllPromotion);
};

export const useQueryGetPromotion = (promotionId: any) => {
  return useQuery(['promotion'], () => promotionApi.getPromotion(promotionId));
};

export default promotionApi;
