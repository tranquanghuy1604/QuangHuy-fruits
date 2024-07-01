import HotProduct from '@/components/home/HotProduct';
import SideBar from '@/components/home/SideBar';
import OnOfProduct from '@/components/home/OneOfProduct';
import React from 'react';
import FeedBack from '@/components/home/FeedBack';

export default function HomeView() {
  return (
    <div className='py-8 bg-[#f8fcfc]'>
      <SideBar />
      <HotProduct />
      <OnOfProduct />
      <FeedBack />
    </div>
  );
}
