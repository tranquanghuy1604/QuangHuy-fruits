import { listSeasonFruits } from '@/constant/app.constant';
import Image from 'next/image';
import React from 'react';

export default function FruitsSeasonView() {
  return (
    <div className='text-[#000] mt-[80px] pb-[80px]'>
      <div className='text-center'>
        <p className='text-[18px] font-[500]'>Chưa được phân loại</p>
        <h3 className='text-[24px] font-[700] mt-[8px]'>Mùa trái cây thế giới</h3>
        <div className='w-[40px] h-[4px] bg-[#cccc] mx-auto my-[10px] rounded-[8px]'></div>
        <p className='text-[14px] text-[#cccc] font-[400]'>Posted on 30 tháng sáu, 2024 by Quang Huy</p>
      </div>
      <p className='mt-[40px] text-[18px] font-[500] text-center'>
        Tùy vào loại sản phẩm, xuất xứ, mùa trái cây sẽ khác nhau và được thể hiện chi tiết như bên dưới:
      </p>
      <div className='w-full'>
        {listSeasonFruits.map((item, index) => (
          <div key={index} className='mt-[60px]'>
            <h4 className='text-[30px] text-center font-[700]'>{item.name}</h4>
            <Image className='mx-auto mt-[20px]' src={item.image} alt='' width={800} height={500} />
          </div>
        ))}
      </div>
    </div>
  );
}
