'use client';
import React from 'react';
import { WalletOutlined, GiftOutlined, CarOutlined, StarOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useQueryGetUser } from '@/api/authApi';
import { useQueryGetUserOrder } from '@/api/orderApi';

export default function OrderInfoView() {
  const { data } = useQueryGetUser();
  const user = data as any;
  const { data: order } = useQueryGetUserOrder({ userId: user?._id });
  const listOrder = order as any;

  const filterStatusUser = (status: any) => {
    return listOrder?.reduce((acc: number, itemOrder: any) => {
      return itemOrder.status === status ? acc + 1 : acc;
    }, 0);
  };

  return (
    <div className='flex justify-around mt-8 text-black'>
      <div className='text-center'>
        <Badge count={filterStatusUser('waiting-confirm')} offset={[0, 5]}>
          <WalletOutlined className='text-2xl' />
        </Badge>
        <div>Chờ xác nhận</div>
      </div>
      <div className='text-center'>
        <Badge count={filterStatusUser('waiting-delivery')} offset={[0, 5]}>
          <GiftOutlined className='text-2xl' />
        </Badge>
        <div>Chờ lấy hàng</div>
      </div>
      <div className='text-center relative'>
        <Badge count={filterStatusUser('pending')} offset={[0, 10]}>
          <CarOutlined className='text-2xl' />
        </Badge>
        <div>Chờ giao hàng</div>
      </div>
      <div className='text-center relative'>
        <Badge count={filterStatusUser('finish')} offset={[0, 10]}>
          <StarOutlined className='text-2xl' />
        </Badge>
        <div>Đánh giá</div>
      </div>
    </div>
  );
}
