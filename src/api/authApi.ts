import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

export interface ParamsLogin {
  email: string;
  password: string;
}

const authApi = {
  async login(param: any) {
    const url = '/user/login';
    return await apiClient.post(url, param);
  },

  async register(params: any) {
    const url = `/user/createUser`;
    return await apiClient.post(url, params);
  },

  changePassWord(params: any) {
    const url = 'user/change-pass';
    return apiClient.post(url, params);
  },
  forgotPassword(param: any) {
    const url = '/user/forgot-password';
    return apiClient.post(url, param);
  },
  getUser() {
    const url = '/user/getUser';
    return apiClient.get(url);
  },
};

export const useLogin = () => {
  return useMutation((params: any) => {
    return authApi.login(params);
  });
};

export const useRegister = () => {
  return useMutation((params: any) => {
    return authApi.register(params);
  });
};

export const useMutationChangePass = () => {
  return useMutation((params: any) => authApi.changePassWord(params));
};

export const useMutationForgotPassword = () => {
  return useMutation((param: any) => authApi.forgotPassword(param));
};

export const useQueryGetUser = () => {
  return useQuery(['user'], authApi.getUser);
};

export default authApi;
