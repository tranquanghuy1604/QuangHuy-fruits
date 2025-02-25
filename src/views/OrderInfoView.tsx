'use client';
import React, { useEffect, useState } from 'react';
import { WalletOutlined, GiftOutlined, CarOutlined, StarOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useQueryGetUser } from '@/api/authApi';
import { useQueryGetUserOrder } from '@/api/orderApi';
import FormRate from '@/components/order-info/FormRate';
import TabFinishOrder from '@/components/order-info/TabFinishOrder';
import TabConfirmOrder from '@/components/order-info/TabConfirmOrder';

export default function OrderInfoView() {
  const [isOpenTab, setIsOpenTab] = useState<string | null>(null);
  const [isOpenModal, setIsoOpenModal] = useState(false);
  const { data } = useQueryGetUser();
  const user = data as any;
  const { data: order } = useQueryGetUserOrder({ userId: user?._id });
  const listOrder = order as any;
  let count;

  const handleOpenTab = (value: string) => {
    setIsOpenTab(value);
  };

  const filterStatusUser = (status: any) => {
    return listOrder?.reduce((acc: number, itemOrder: any) => {
      return itemOrder.status === status ? acc + 1 : acc;
    }, 0);
  };

  const filterRewardOrder = () => {
    return listOrder?.reduce((acc: any, item: any) => {
      if (item?.rates.length === 0) {
        acc === 0;
      } else {
        acc++;
      }
      return acc;
    }, 0);
  };
  count = filterRewardOrder();

  return (
    <>
      <div className='flex justify-around mt-[100px] text-black w-full max-w-[800px] mx-auto'>
        <button onClick={() => handleOpenTab('waiting-confirm')} className='text-center'>
          <Badge count={filterStatusUser('waiting-confirm')} offset={[0, 5]}>
            <WalletOutlined className='text-2xl' />
          </Badge>
          <div>Chờ xác nhận</div>
        </button>
        <button onClick={() => handleOpenTab('waiting-delivery')} className='text-center'>
          <Badge count={filterStatusUser('waiting-delivery')} offset={[0, 5]}>
            <GiftOutlined className='text-2xl' />
          </Badge>
          <div>Chờ lấy hàng</div>
        </button>
        <div className='text-center relative'>
          <Badge count={filterStatusUser('pending')} offset={[0, 10]}>
            <CarOutlined className='text-2xl' />
          </Badge>
          <div>Chờ giao hàng</div>
        </div>

        <button onClick={() => setIsoOpenModal(true)} className='text-center relative'>
          <Badge count={count} offset={[0, 10]}>
            <StarOutlined className='text-2xl' />
          </Badge>
          <div>Đánh giá</div>
        </button>
        <button onClick={() => handleOpenTab('finish')} className='text-center relative'>
          <Badge count={filterStatusUser('pending')} offset={[0, 10]}>
            <FileDoneOutlined className='text-2xl' />
          </Badge>
          <div>Hoàn thành</div>
        </button>
      </div>
      {isOpenTab === 'waiting-confirm' && <TabConfirmOrder userId={user?._id} />}
      {isOpenTab === 'finish' && <TabFinishOrder userId={user?._id} />}
      <FormRate item={listOrder} open={isOpenModal} onClose={() => setIsoOpenModal(false)} />
    </>
  );
}
