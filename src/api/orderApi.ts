import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const orderApi = {
  async createOrder(params: any) {
    const url = '/order';
    return await apiClient.post(url, params);
  },
  async getOrders() {
    const url = '/order';
    return await apiClient.get(url);
  },
  async getUserOrder(userId: any) {
    const url = '/order/get-user-order';
    return await apiClient.post(url, userId);
  },
  async getOrderFinish(userId: any) {
    const url = '/order/get-order-finish';
    return await apiClient.post(url, userId);
  },
  async paymentOrder(params: any) {
    const url = '/payment/create-payment-url';
    return await apiClient.post(url, params);
  },
};

export const useMutationCreateOrder = () => {
  return useMutation((params: any) => orderApi.createOrder(params));
};

export const useQueryGetOrders = () => {
  return useQuery(['list-order'], () => orderApi.getOrders);
};

export const useQueryGetUserOrder = (userId: any) => {
  return useQuery(['list-user-order', userId], () => orderApi.getUserOrder(userId), { enabled: !!userId });
};

export const useQueryGetOrderFinish = (userId: any) => {
  return useQuery(['list-order-finish', userId], () => orderApi.getOrderFinish(userId), { enabled: !!userId });
};

export const useMutationPaymentOrder = () => {
  return useMutation((params: any) => orderApi.paymentOrder(params));
};

export default orderApi;
