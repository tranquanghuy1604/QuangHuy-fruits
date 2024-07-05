'use client';
import { useQueryGetUser } from '@/api/authApi';
import { useMutationCreateOrder, useMutationPaymentOrder } from '@/api/orderApi';
import { cartState, loggedState } from '@/recoil/common.recoil';
import { FormatPrice } from '@/utils/fomartPrice';
import { Button, Input, Select, Form, Spin, Radio, RadioChangeEvent } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';

const { Option } = Select;

export default function PayMentView() {
  const [value, setValue] = useState(1);
  const [urlPayment, setUrlPayment] = useState('');

  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const [total, setTotal] = useState(0);
  const { data, isLoading } = useQueryGetUser();
  const [logged, setLogged] = useRecoilState(loggedState);
  const user = data as any;
  const { mutate: createOrder } = useMutationCreateOrder();
  useEffect(() => {
    const cartTotal = cart.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
    setTotal(cartTotal);
  }, [cart]);

  const { mutate: paymentOrder } = useMutationPaymentOrder();

  const onFinish = (values: any) => {
    const infoUser = {
      fullname: values.first_name + ' ' + values.last_name,
      phone: values.phone,
      email: values.email,
      address: values.address,
    };
    if (user) {
      if (value === 1) {
        createOrder(
          {
            customer: infoUser,
            created_at: new Date(),
            payment: true,
            payment_method: 'offline',
            note: values.notes,
            total_price: total,
            products: cart.map((r: any) => {
              return {
                product: r._id,
                quantity: r.quantity,
              };
            }),
            customer_id: user?._id,
            ship_code: Math.floor(total * 0.05),
            product_name: cart.map((item: any) => {
              return { productName: item?.name, quantity: item?.quantity };
            }),
          },
          {
            onSuccess: (data) => {
              setCart([]);
              toast.success('Đặt hàng thành công');
            },
          },
        );
      } else {
        paymentOrder(
          { total: total },
          {
            onSuccess: (data: any) => {
              router.push(`${data?.payUrl}`);
            },
          },
        );
        // createOrder(
        //   {
        //     customer: infoUser,
        //     created_at: new Date(),
        //     payment: true,
        //     payment_method: 'online',
        //     note: values.notes,
        //     total_price: 0,
        //     products: cart.map((r: any) => {
        //       return {
        //         product: r._id,
        //         quantity: r.quantity,
        //       };
        //     }),
        //     customer_id: user?._id,
        //     ship_code: Math.floor(total * 0.05),
        //     product_name: cart.map((item: any) => {
        //       return { productName: item?.name, quantity: item?.quantity };
        //     }),
        //   },
        //   {
        //     onSuccess: (data) => {
        //       setCart([]);
        //       toast.success('Đặt hàng thành công');
        //     },
        //   },
        // );
      }
    } else {
      toast.error('Bạn phải đăng nhập tài khoản để thanh toán');
      router.push('/login');
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  console.log(value);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-[100px]'>
        <Spin />
      </div>
    );
  }

  return (
    <div className='text-[#000] mt-[40px] px-16'>
      <div>
        <div className='md:flex justify-between items-start mt-[50px]'>
          <div className='rounded w-full max-w-[800px]'>
            <h2 className='text-xl font-bold mb-4'>THÔNG TIN THANH TOÁN</h2>
            {logged ? (
              <Form
                name='basic'
                initialValues={{
                  first_name: user?.first_name,
                  last_name: user?.last_name,
                  province: user?.province,
                  phone: user?.phone,
                  email: user?.email,
                }}
                onFinish={onFinish}
                autoComplete='off'
                layout='vertical'
              >
                <div className='flex justify-between'>
                  <Form.Item
                    className='w-[40%]'
                    label='Tên'
                    name='first_name'
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className='w-[40%]'
                    label='Họ'
                    name='last_name'
                    rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                <Form.Item
                  label='Địa chỉ'
                  name='address'
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Tỉnh / Thành phố'
                  name='province'
                  rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Số điện thoại'
                  name='phone'
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Địa chỉ email'
                  name='email'
                  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label='Ghi chú đơn hàng (tùy chọn)' name='notes'>
                  <Input.TextArea style={{ minHeight: 100 }} />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' className='w-full min-h-[50px]'>
                    ĐẶT HÀNG
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Form name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
                <div className='flex justify-between'>
                  <Form.Item
                    className='w-[40%]'
                    label='Tên'
                    name='first_name'
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className='w-[40%]'
                    label='Họ'
                    name='last_name'
                    rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                <Form.Item
                  label='Địa chỉ'
                  name='address'
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Tỉnh / Thành phố'
                  name='province'
                  rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Số điện thoại'
                  name='phone'
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Địa chỉ email'
                  name='email'
                  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label='Ghi chú đơn hàng (tùy chọn)' name='notes'>
                  <Input.TextArea style={{ minHeight: 100 }} />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' className='w-full min-h-[50px]'>
                    ĐẶT HÀNG
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
          <div className='rounded w-full border-[2px] border-solid border-[#00C42E] max-w-[400px] p-8'>
            <h2 className='text-xl font-bold mb-4'>ĐƠN HÀNG CỦA BẠN</h2>
            <div className='border-b pb-4 mb-4'>
              {cart.map((item: any) => (
                <p key={item._id} className='flex justify-between'>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{FormatPrice(item.price * item.quantity)} đ</span>
                </p>
              ))}
            </div>
            <div className='border-b pb-4 mb-4'>
              <p className='flex justify-between'>
                <span>Tạm tính</span>
                <span>{FormatPrice(total)} đ</span>
              </p>
            </div>
            <div className='border-b pb-4 mb-4'>
              <p className='flex justify-between'>
                <span>Tổng</span>
                <span>{FormatPrice(total)} đ</span>
              </p>
            </div>
            <p className='mt-4 text-gray-500 text-sm'>
              Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các
              mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.
            </p>
            <Radio.Group className='mt-[20px]' onChange={onChange} value={value}>
              <Radio value={1}>Thanh toán bằng tiền mặt</Radio> <br />
              <Radio className='mt-[8px]' value={2}>
                Thanh Toán bằng MOMO
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
