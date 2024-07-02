'use client';
import { useLogin } from '@/api/authApi';
import { loggedState } from '@/recoil/common.recoil';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';

interface ValueLogin {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { mutate: login } = useLogin();
  const router = useRouter();
  const [logged, setLogged] = useRecoilState(loggedState);

  const onFinish = (values: ValueLogin) => {
    login(
      { email: values.email, password: values.password },
      {
        onSuccess: (data: any) => {
          localStorage.setItem('authToken', data?.token);
          localStorage.setItem('authToken', data?.token);
          setLogged(true);
          toast.success('Đăng nhập thành công');
          router.push('/');
        },
      },
    );
  };
  return (
    <>
      <div className='w-full max-w-[800px] mx-auto mt-[80px] text-black'>
        <h2 className='text-2xl font-bold'>Đăng nhập</h2>
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
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
              <Link href='forgot-password'>Quên mật khẩu</Link>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Đăng nhập
            </Button>{' '}
            Hoặc{' '}
            <Link className='ml-[5px]' href='/register'>
              Đăng ký
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
