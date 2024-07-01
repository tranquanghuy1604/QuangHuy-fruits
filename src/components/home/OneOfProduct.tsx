'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { Button } from 'antd';
import Image from 'next/image';

export default function OnOfProduct() {
  return (
    <div>
      <div className='bg-[#00C42E] w-full text-white py-[20px] text-center text-[30px] font-[700]'>Sản phẩm</div>
      <div className='p-8'>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className='mySwiper cursor-pointer bg-white'
        >
          <SwiperSlide className='shadow-lg p-4 border-[1px] border-solid border-[#cccc] w-full'>
            <Image className='object-cover' width={400} height={300} src='/image/home/logo.jpg' alt='' />
            <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>Cam đỏ</p>
            <div className='text-center mt-[10px]'>
              <Button className='' type='primary'>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-lg p-4 border-[1px] border-solid border-[#cccc]'>
            <Image className='object-cover' width={400} height={300} src='/image/home/logo.jpg' alt='' />
            <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>Cam đỏ</p>
            <div className='text-center mt-[10px]'>
              <Button className='' type='primary'>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-lg p-4 border-[1px] border-solid border-[#cccc]'>
            <Image className='object-cover' width={400} height={300} src='/image/home/logo.jpg' alt='' />
            <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>Cam đỏ</p>
            <div className='text-center mt-[10px]'>
              <Button className='' type='primary'>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-lg p-4 border-[1px] border-solid border-[#cccc]'>
            <Image className='object-cover' width={400} height={300} src='/image/home/logo.jpg' alt='' />
            <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>Cam đỏ</p>
            <div className='text-center mt-[10px]'>
              <Button className='' type='primary'>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='shadow-lg p-4 border-[1px] border-solid border-[#cccc]'>
            <Image className='object-cover' width={400} height={300} src='/image/home/logo.jpg' alt='' />
            <p className='text-center text-[20px] font-[500] leading-[30px] mt-[20px]'>Cam đỏ</p>
            <div className='text-center mt-[10px]'>
              <Button className='' type='primary'>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
