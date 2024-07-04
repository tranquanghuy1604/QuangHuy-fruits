'use client';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useMutationForgotPassword } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ForgotPasswordView() {
  const { mutate: changePassword } = useMutationForgotPassword();
  const router = useRouter();
  const onFinish = (values: any) => {
    changePassword(
      { email: values.email },
      {
        onSuccess: () => {
          toast.success('Mật khẩu đã reset.Hãy kiểm tra mail của bạn');
          router.push('/login');
        },
      },
    );
  };
  return (
    <div className='w-full max-w-[800px] mx-auto mt-[80px] text-black'>
      <h2 className='text-2xl font-bold'>Quên mật khẩu</h2>
      <Form name='normal_login' className='login-form mt-[20px]' initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your Email!' },
          ]}
        >
          <Input
            className='mt-[10px] h-[50px]'
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full max-w-[250px] mx-auto h-[40px]'>
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
