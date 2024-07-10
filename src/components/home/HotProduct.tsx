'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import { useQueryGetAllPromotion } from '@/api/promotionApi';
import { FormatPrice } from '@/utils/fomartPrice';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/common.recoil';

export default function HotProduct() {
  const { data } = useQueryGetAllPromotion();
  const listProduct = data as any;
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (item: any) => {
    const promotion = getPromotionalPrice(item);
    const price = promotion
      ? item.product_id.price - item.product_id.price * (item?.discount / 100)
      : item.product_id.price;

    const existingItem = cart.find((cartItem: any) => cartItem._id === item.product_id._id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem: any) =>
        cartItem._id === item.product_id._id ? { ...cartItem, quantity: cartItem.quantity + 1, price } : cartItem,
      );
      setCart(updatedCart);
    } else {
      const newCart = [...cart, { ...item.product_id, quantity: 1, price }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const getPromotionalPrice = (item: any) => {
    return item;
  };

  return (
    <div>
      <div className='bg-[#00C42E] w-full text-white py-[20px] text-center text-[30px] font-[700]'>
        Sản phẩm khuyến mãi
      </div>
      <div className='p-8'>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className='mySwiper cursor-pointer bg-white'
        >
          {listProduct?.map((item: any) => (
            <SwiperSlide key={item?._id} className='shadow-lg p-4 border-[1px] border-solid border-[#cccc] w-full'>
              <div className='overflow-hidden'>
                <Image
                  width={300}
                  height={200}
                  className='object-cover hover:scale-[1.3] transition-all overflow-hidden'
                  src={`http://localhost:5000/${item?.product_id?.images}`}
                  alt=''
                />
              </div>
              <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>{item?.product_id?.name}</p>
              <p className='mt-[10px] text-center'>
                <span className='line-through'>{FormatPrice(item?.product_id?.price)}đ/kg</span>
                <span className='ml-2 text-red-500'>
                  {FormatPrice(item?.product_id?.price - item?.product_id?.price * (item?.discount / 100))}đ/kg
                </span>
              </p>
              <div className='text-center mt-[10px]'>
                <Button className='' type='primary' onClick={() => addToCart(item)}>
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
