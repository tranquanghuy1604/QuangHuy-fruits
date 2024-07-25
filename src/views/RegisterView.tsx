'use client';
import { useRegister } from '@/api/authApi';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const { mutate: register } = useRegister();
  const router = useRouter();
  const onFinish = (values: any) => {
    register(
      {
        first_name: values.first_name,
        last_name: values.last_name,
        province: values.province,
        ward: values.ward,
        phone: values.phone,
        gender: values.gender,
        email: values?.email,
        password: values?.password,
      },
      {
        onSuccess: (data) => {
          toast.success('Đăng ký thành công');
          router.push('/login');
        },
        onError: (error: any) => {
          toast.error('Tài khoản' + ' ' + error?.response?.data?.keyValue?.email + ' ' + 'đã tồn tại');
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
          <div className='flex justify-between'>
            <Form.Item
              className='w-[49%]'
              name='first_name'
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input className='h-[50px]' placeholder='Tên' />
            </Form.Item>

            <Form.Item className='w-[49%]' name='last_name' rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
              <Input className='h-[50px]' placeholder='Họ' />
            </Form.Item>
          </div>
          <Form.Item
            name='email'
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your Email!' },
            ]}
          >
            <Input className='mt-[10px] h-[50px]' placeholder='Email' />
          </Form.Item>

          <Form.Item name='province' rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}>
            <Input className='h-[50px]' placeholder='Tỉnh' />
          </Form.Item>
          <Form.Item name='ward' rules={[{ required: true, message: 'Vui lòng nhập huyện' }]}>
            <Input className='h-[50px]' placeholder='Huyện' />
          </Form.Item>

          <Form.Item name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input className='h-[50px]' placeholder='Số điện thoại' />
          </Form.Item>
          <Form.Item name='gender' rules={[{ required: true, message: 'Vui lòng nhập số Giới tính' }]}>
            <Select
              className='h-[50px]'
              placeholder='Giới tính'
              options={[
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
              ]}
            />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!', min: 6 }]}>
            <Input.Password className='mt-[10px] h-[50px]' type='password' placeholder='Password' />
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
            <Input.Password className='mt-[10px] h-[50px]' type='password' placeholder='Confirm Password' />
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
