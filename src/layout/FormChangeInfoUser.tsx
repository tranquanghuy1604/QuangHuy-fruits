'use client';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutationChangePass, useMutationEditUser } from '@/api/authApi';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

interface Props {
  handleCancel: () => void;
  item: any;
}
export default function FormEditInfoUser({ open, item, onClose }: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate: editUser } = useMutationEditUser(item?._id);
  const onFinish = (values: any) => {
    editUser(
      {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        email: values.email,
        ward: values.ward,
        province: values.province,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          toast.success('Thay đổi thông tin thành công');
          queryClient.invalidateQueries(['user']);
          onClose();
        },
      },
    );
    form.resetFields();
  };

  return (
    <>
      <Modal centered title='Đổi mật khẩu' open={open} onCancel={onClose} footer={false}>
        <Form
          initialValues={{
            first_name: item?.first_name,
            last_name: item?.last_name,
            email: item?.email,
            ward: item?.ward,
            province: item?.province,
            phone: item?.phone,
          }}
          form={form}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item label='Tên' name='first_name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input className='' placeholder='Tên' />
          </Form.Item>

          <Form.Item label='Họ' name='last_name' rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
            <Input className='' placeholder='Họ' />
          </Form.Item>

          <Form.Item
            label='Số điện thoại'
            name='phone'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input className='' placeholder='Số điện thoại' />
          </Form.Item>

          <Form.Item label='Huyện' name='ward' rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
            <Input className='' placeholder='Họ' />
          </Form.Item>

          <Form.Item label='Tỉnh' name='province' rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
            <Input className='' placeholder='Họ' />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your Email!' },
            ]}
          >
            <Input className='mt-[10px] ' placeholder='Email' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
