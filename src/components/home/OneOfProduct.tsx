'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { Button } from 'antd';
import Image from 'next/image';
import { useQueryGetListProduct } from '@/api/productApi';
import { FormatPrice } from '@/utils/fomartPrice';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/common.recoil';

export default function OnOfProduct() {
  const { data } = useQueryGetListProduct();
  const listProduct = data as any;
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (item: any) => {
    const price = item.price;

    const existingItem = cart.find((cartItem: any) => cartItem._id === item._id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem: any) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1, price } : cartItem,
      );
      setCart(updatedCart);
    } else {
      const newCart = [...cart, { ...item, quantity: 1, price }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };
  return (
    <div>
      <div className='bg-[#00C42E] w-full text-white py-[20px] text-center text-[30px] font-[700]'>Một số sản phẩm</div>
      <div className='p-8'>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className='mySwiper cursor-pointer bg-white'
        >
          {listProduct?.map((item: any, indx: any) => {
            if (indx < 5) {
              return (
                <SwiperSlide className='shadow-lg p-4 border-[1px] border-solid border-[#cccc] w-full'>
                  <div className='overflow-hidden'>
                    <img
                      className='object-cover w-[300px] h-[200px] hover:scale-[1.3] transition-all overflow-hidden'
                      src={`http://localhost:5000/${item?.images}`}
                      alt=''
                    />
                  </div>
                  <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>{item?.name}</p>

                  <p className='mt-[10px] text-center'>{FormatPrice(item.price)}đ/kg</p>
                  <div className='text-center mt-[10px]'>
                    <Button className='' type='primary' onClick={() => addToCart(item)}>
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
}
