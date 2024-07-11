'use client';
import { useMutationDeleteOrderFromUser, useQueryGetOrderConfirm, useQueryGetOrderFinish } from '@/api/orderApi';
import { Button } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export default function TabConfirmOrder({ userId }: any) {
  const { data } = useQueryGetOrderConfirm({ customer_id: userId });
  const { mutate: deleteOrder } = useMutationDeleteOrderFromUser();
  const listOrderFinish = data as any;
  const queryClient = useQueryClient();

  const handleDeleteOrder = (orderId: any) => {
    deleteOrder(
      { _id: orderId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('list-order-waiting');
          queryClient.invalidateQueries('list-user-order');
          toast.success('Hủy đơn thành công');
        },
      },
    );
  };

  return (
    <div className='mt-[40px] text-black w-full max-w-[800px] mx-auto'>
      {listOrderFinish?.length > 0 ? (
        listOrderFinish?.map((item: any, index: any) => (
          <div key={index} className='flex justify-between gap-[20px] items-center mt-[30px]'>
            <div className='flex-1 flex justify-between items-center p-4 border border-[#ccc] rounded-lg shadow-sm'>
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
            <Button onClick={() => handleDeleteOrder(item?._id)} type='primary'>
              Hủy đơn
            </Button>
          </div>
        ))
      ) : (
        <div className='text-black text-center'>Chưa có đơn hàng nào được giao</div>
      )}
    </div>
  );
}
