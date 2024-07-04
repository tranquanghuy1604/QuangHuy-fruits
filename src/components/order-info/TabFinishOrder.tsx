'use client';
import { useQueryGetOrderFinish } from '@/api/orderApi';
import { Button } from 'antd';
import React from 'react';

export default function TabFinishOrder({ userId }: any) {
  const { data } = useQueryGetOrderFinish({ userId: userId });

  const listOrderFinish = data as any;
  return (
    <div className='mt-[40px] text-black w-full max-w-[800px] mx-auto'>
      {listOrderFinish?.map((item: any) => (
        <div className='mt-[30px] flex justify-between items-center p-4 border border-[#ccc] rounded-lg shadow-sm'>
          <div>
            <p className='text-xl font-semibold'>Đơn hàng</p>
            <h2 className='text-lg font-semibold mt-2'>
              {item?.product_name
                .map((itemProduct: any) => itemProduct.productName + ' x ' + itemProduct.quantity)
                .join(', ')}
            </h2>
          </div>

          <div>
            <p className='text-xl font-semibold'>Thành tiền</p>
            <p className='text-lg font-semibold mt-2'>{Number(item?.total_price).toLocaleString('en-US')}₫</p>
          </div>
        </div>
      ))}
    </div>
  );
}
