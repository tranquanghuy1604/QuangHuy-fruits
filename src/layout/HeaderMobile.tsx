import { Dropdown, Image, Menu } from 'antd';
import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
const { SubMenu } = Menu;
export default function HeaderMobile({ open, onClose }: any) {
  return (
    <div className='lg:hidden'>
      {open && (
        <div className='fixed z-[1000] top-0 left-0 w-full h-full bg-black bg-opacity-50' onClick={onClose}>
          <div
            className='overflow-auto h-full px-[20px] max-w-[400px] w-full pt-[20px] text-white bg-white animate-wave transition-all'
            onPointerDown={(e) => e.stopPropagation()}
          >
            <FaXmark className='text-[20px] float-right text-black cursor-pointer' onClick={onClose} />

            <div className='w-full mx-auto text-center mt-[20px]'>
              <Image
                src='/image/home/logo.png'
                alt='logo'
                className='cursor-pointer w-full mx-auto'
                width={50}
                height={50}
              />
            </div>
            <div className='text-black' onClick={(e) => e.stopPropagation()}>
              <Menu mode='inline' className='font-[700]' style={{ border: 'none' }}>
                <SubMenu key='sub1' title='Sản phẩm' style={{ borderBottom: 'none' }}>
                  <Menu.Item key='1' style={{ borderBottom: 'none' }}>
                    <Link href='/imported-fruit'>Hoa quả nhập khẩu</Link>
                  </Menu.Item>
                  <Menu.Item key='2' style={{ borderBottom: 'none' }}>
                    <Link href='/regional-fruits'>Hoa quả xuất khẩu</Link>
                  </Menu.Item>
                  <Menu.Item key='3' style={{ borderBottom: 'none' }}>
                    <Link href='#'>Hộp quà</Link>
                  </Menu.Item>
                  <Menu.Item key='4' style={{ borderBottom: 'none' }}>
                    <Link href='#'>Khắc quả</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key='sub2' title='Tin tức' style={{ borderBottom: 'none' }}>
                  <Menu.Item key='1' style={{ borderBottom: 'none' }}>
                    <Link href='#'>Khuyến mãi</Link>
                  </Menu.Item>
                  <Menu.Item key='2' style={{ borderBottom: 'none' }}>
                    <Link href='#'>Tuyển dụng</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key='sub3' style={{ borderBottom: 'none' }}>
                  <Link href='/season-fruits'>Mùa trái cây thế giới</Link>
                </Menu.Item>
                <Menu.Item key='sub4' style={{ borderBottom: 'none' }}>
                  <Link href='/introduce'>Giới thiệu</Link>
                </Menu.Item>
                <Menu.Item key='sub5' style={{ borderBottom: 'none' }}>
                  <Link href='#'>Liên hệ</Link>
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
