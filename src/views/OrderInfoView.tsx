'use client';
import React from 'react';
import { WalletOutlined, GiftOutlined, CarOutlined, StarOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useQueryGetUser } from '@/api/authApi';

export default function OrderInfoView() {
  const { data } = useQueryGetUser();
  const user = data as any;
  return (
    <div className='flex justify-around mt-8 text-black'>
      <div className='text-center'>
        <Badge count={user?.status === 'waiting-confirm' ? 1 : 0} offset={[0, 5]}>
          <WalletOutlined className='text-2xl' />
        </Badge>
        <div>Chờ xác nhận</div>
      </div>
      <div className='text-center'>
        <Badge count={user?.status === 'waiting-delivery' ? 1 : 0} offset={[0, 5]}>
          <GiftOutlined className='text-2xl' />
        </Badge>
        <div>Chờ lấy hàng</div>
      </div>
      <div className='text-center relative'>
        <Badge count={user?.status === 'pending' ? 1 : 0} offset={[0, 10]}>
          <CarOutlined className='text-2xl' />
        </Badge>
        <div>Chờ giao hàng</div>
      </div>
      <div className='text-center relative'>
        <Badge count={user?.status === 'finish' ? 1 : 0} offset={[0, 10]}>
          <StarOutlined className='text-2xl' />
        </Badge>
        <div>Đánh giá</div>
      </div>
    </div>
  );
}
