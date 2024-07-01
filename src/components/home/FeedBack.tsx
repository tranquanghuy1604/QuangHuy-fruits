'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function FeedBack() {
  return (
    <div>
      <div className='bg-[#00C42E] w-full text-white py-[20px] text-center text-[30px] font-[700]'>
        Khách hàng nói về
      </div>
      <div className=''>
        <div className='pt-[50px]'>
          <Swiper slidesPerView={3} spaceBetween={30} className='mySwiper cursor-pointer'>
            <SwiperSlide className='mx-auto'>
              <div className='max-w-[350px] px-[40px] border-[1px] border-[#00C42E] border-dashed mx-auto py-4 bg-white rounded-[10px]'>
                <Image
                  src='/image/home/feefback-1.jpg'
                  className='rounded-full mx-auto'
                  width={200}
                  height={200}
                  alt=''
                />
                <p className='mt-[20px] text-[14px] italic'>
                  Cô hay đi lễ chùa nên phải mua hoa quả thường xuyên. Tiêu chí của cô là hoa quả đi lễ phải tươi mới,
                  mã đẹp, chất lượng và Thủy Anh luôn đáp ứng được điều đó. Cô sẽ tiếp tục ủng hộ Thủy Anh Fruits lâu
                  dài.
                </p>
                <p className='mt-[20px] text-center text-[14px] font-[600]'>
                  Cô Kim Ngân
                  <span className='font-[400]'>/ Nội trợ</span>
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='mx-auto'>
              <div className='max-w-[350px] px-[40px] border-[1px] border-[#00C42E] border-dashed mx-auto py-4 bg-white rounded-[10px]'>
                <Image
                  className='rounded-full mx-auto'
                  src='/image/home/feedback-2.jpg'
                  width={200}
                  height={200}
                  alt=''
                />
                <p className='mt-[20px] text-[14px] italic'>
                  Tôi rất hài lòng khi mua hàng hoa quả tại Thủy Anh. Qủa bao giờ cũng tươi mới, chất lượng chuẩn. Đặc
                  biệt mua hàng online nhưng các bạn tư vấn rất nhiệt tình và đầy đủ cung như giao hàng rất nhanh.
                </p>
                <p className='mt-[20px] text-center text-[14px] font-[600]'>
                  Chị Huyền My
                  <span className='font-[400]'>/ Nhân viên văn phòng</span>
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='mx-auto'>
              <div className='max-w-[350px] px-[40px] border-[1px] border-[#00C42E] border-dashed mx-auto py-4 bg-white rounded-[10px]'>
                <Image
                  className='rounded-full mx-auto'
                  src='/image/home/feedback-3.jpg'
                  width={200}
                  height={200}
                  alt=''
                />
                <p className='mt-[20px] text-[14px] italic'>
                  Cách mix quả, cắm hoa tại Thủy Anh luôn vô cùng mới lạ, độc đáo, đẹp, tạo nên chất riêng, chính vì vậy
                  3 năm gần đây anh luôn lựa chọn lẵng hoa quả của Thủy Anh để làm quà biếu cho đối tác của mình.
                </p>
                <p className='mt-[20px] text-center text-[14px] font-[600]'>
                  Anh Tuấn Anh
                  <span className='font-[400]'>/ CEO</span>
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
