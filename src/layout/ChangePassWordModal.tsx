'use client';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutationChangePass } from '@/api/authApi';
import toast from 'react-hot-toast';

export default function ChangePassWordModal({ open, onClose }: any) {
  const { mutate: changePass } = useMutationChangePass();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    changePass(
      { oldPass: values.oldPassword, newPass: values.newPassword },
      {
        onSuccess: (data) => {
          toast.success('Đổi mật khẩu thành công');
          form.resetFields();
          onClose();
        },
      },
    );
  };

  return (
    <>
      <Modal centered title='Đổi mật khẩu' open={open} onCancel={onClose} footer={false}>
        <Form
          name='normal_login'
          className='login-form mt-[20px]'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='vertical'
          form={form}
        >
          <Form.Item
            label='Mật khẩu cũ'
            name='oldPassword'
            rules={[{ required: true, message: 'Please input your Old password!' }]}
          >
            <Input.Password
              className='mt-[10px] h-[50px]'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Nhập mật khẩu cũ'
            />
          </Form.Item>
          <Form.Item name='newPassword' rules={[{ required: true, message: 'Please input your Password!', min: 6 }]}>
            <Input.Password
              className='mt-[10px] h-[50px]'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Nhập mới khẩu mới'
            />
          </Form.Item>

          <Form.Item
            name='confirm-password'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
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
            <Button type='primary' htmlType='submit' className='w-full'>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
