'use client';
import { useMutationCreateOrder } from '@/api/orderApi';
import { cartState } from '@/recoil/common.recoil';
import { FormatPrice } from '@/utils/fomartPrice';
import { Button, InputNumber } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';

export default function ShoppingCartView() {
  const [cart, setCart] = useRecoilState(cartState);

  const handleIncrease = (index: number) => {
    const newCart = [...cart]; // Create a shallow copy of cart
    newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 }; // Update quantity of the specific item
    updateCart(newCart);
  };

  const handleDecrease = (index: number) => {
    const newCart = [...cart]; // Create a shallow copy of cart
    newCart[index] = { ...newCart[index], quantity: Math.max(newCart[index].quantity - 1, 1) }; // Ensure quantity doesn't go below 1
    updateCart(newCart);
  };

  const handleRemove = (index: number) => {
    const newCart = cart.filter((_: any, i: any) => i !== index); // Create a new array without the item at index
    updateCart(newCart);
  };

  const onChange = (value: number | undefined, index: number) => {
    const newCart = [...cart]; // Create a shallow copy of cart
    const quantity = typeof value === 'number' ? value : 1; // Default to 1 if value is undefined
    newCart[index] = { ...newCart[index], quantity }; // Update quantity of the specific item
    updateCart(newCart);
  };

  const updateCart = (newCart: any[]) => {
    setCart(newCart); // Update Recoil state
    localStorage.setItem('cart', JSON.stringify(newCart)); // Update localStorage
  };

  const getTotal = () => {
    return cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='text-[#000] mt-[30px]'>
      <div className='flex justify-between'>
        <div className='w-[65%]'>
          <table className='w-full'>
            <thead className='border-b-[2px] border-solid border-[#cccc] rounded-md'>
              <tr>
                <th className='text-left'>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th className='text-right'>Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: any, index: any) => (
                <tr key={item._id}>
                  <td className='text-left py-[10px]'>
                    <div className='flex items-center gap-[10px]'>
                      <FaRegCircleXmark className='text-[20px] cursor-pointer' onClick={() => handleRemove(index)} />
                      <img className='w-[30px] h-[30px]' src={`http://localhost:5000/${item.images}`} alt={item.name} />
                      <p className='text-[15px] font-[400]'>{item.name}</p>
                    </div>
                  </td>
                  <td className='text-center py-[10px]'>{FormatPrice(item.price)} đ</td>
                  <td className='text-center py-[10px]'>
                    <div className='flex items-center justify-center'>
                      <button onClick={() => handleDecrease(index)} className='px-[10px] bg-[#cccc] h-[30px]'>
                        -
                      </button>
                      <InputNumber
                        value={item.quantity}
                        type='number'
                        className='h-[30px] text-center w-[40px] outline-none rounded-none input-shop'
                        controls={false}
                        onChange={(value) => onChange(value, index)}
                      />
                      <button onClick={() => handleIncrease(index)} className='px-[10px] bg-[#cccc] h-[30px]'>
                        +
                      </button>
                    </div>
                  </td>
                  <td className='text-right py-[10px]'>{FormatPrice(item.price * item.quantity)} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='hidden md:block w-[1px] min-h-[500px] bg-[#000]'></div>
        <div className='w-[30%]'>
          <div className='border-b-[2px] border-[#000] py-[10px]'>Cộng giỏ hàng</div>
          <div className='mt-[20px]'>
            <div className='flex justify-between border-b-[1px] border-[#000] py-[10px]'>
              <p>Tạm tính</p>
              <p>{FormatPrice(getTotal())} đ</p>
            </div>
            <div className='flex justify-between border-b-[1px] border-[#000] py-[10px]'>
              <p>Tổng</p>
              <p>{FormatPrice(getTotal())} đ</p>
            </div>
          </div>
          <Button className='w-full mt-[40px] h-[40px]' type='primary'>
            <Link href='/pay-ment'>Tiến hành thanh toán</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
