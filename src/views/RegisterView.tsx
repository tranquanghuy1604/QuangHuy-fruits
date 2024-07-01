'use client';
import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import Link from 'next/link';
import { useRegister } from '@/api/authApi';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const { mutate: register } = useRegister();

  const onFinish = (values: any) => {
    register(
      { email: values?.email, password: values?.password },
      {
        onSuccess: (data) => {
          toast.success('Đăng ký thành công');
        },
      },
    );
  };
  return (
    <div className='w-full max-w-[800px] mx-auto mt-[80px] text-black'>
      <div>
        <p className='text-[20px] font-[700]'>Đăng ký</p>
        <Form
          name='normal_login'
          className='login-form mt-[20px]'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!', min: 6 }]}>
            <Input.Password
              className='mt-[10px] h-[50px]'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item
            name='confirm-password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              className='mt-[10px] h-[50px]'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Confirm Password'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Đăng ký
            </Button>{' '}
            Hoặc{' '}
            <Link className='ml-[5px]' href='/login'>
              Đăng nhập
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
