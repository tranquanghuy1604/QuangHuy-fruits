'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import { serviceShop } from '@/constant/app.constant';
export default function SideBar() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className='mySwiper'
      >
        <SwiperSlide>
          <img className='h-[500px] w-full object-cover' src='/image/home/banner-1.jpg' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-[500px] w-full object-cover' src='/image/home/banner-2.jpg' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-[500px] w-full object-cover' src='/image/home/banner-3.jpg' alt='' />
        </SwiperSlide>
      </Swiper>
      <div className='grid grid-cols-4 items-center gap-[40px] px-[20px] py-[40px]'>
        {serviceShop.map((item, index) => (
          <div key={index} className='item-span-1 flex items-start gap-[20px]'>
            <img src={item.image} alt='' />
            <div>
              <p className='text-[#191919]'>{item.title}</p>
              <p className='mt-[5px]'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
