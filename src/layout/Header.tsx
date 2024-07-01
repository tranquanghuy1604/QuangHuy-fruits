'use client';
import { Dropdown, Input, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import {
  FaArrowDown,
  FaBasketShopping,
  FaCircleUser,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { useRecoilState } from 'recoil';
import { cartState, loggedState } from '@/recoil/common.recoil';
import { useRouter } from 'next/navigation';
import ChangePassWordModal from './ChangePassWordModal';
import { useMutationFindProduct } from '@/api/productApi';

const productMenuItems: MenuProps['items'] = [
  {
    key: '1',
    className: 'custom-dropdown-item',
    label: (
      <Link href='/imported-fruit' className=''>
        Hoa quả nhập khẩu
      </Link>
    ),
  },
  {
    key: '2',
    className: 'custom-dropdown-item',
    label: (
      <Link href='/regional-fruits' className=''>
        Hoa quả vùng miền
      </Link>
    ),
  },
  {
    key: '3',
    className: 'custom-dropdown-item',
    label: (
      <Link href='#' className=''>
        Hộp quà
      </Link>
    ),
  },
  {
    key: '4',
    className: 'custom-dropdown-item',
    label: (
      <Link href='#' className=''>
        Khắc quả
      </Link>
    ),
  },
];

const userNewsMenu: MenuProps['items'] = [
  {
    key: '1',
    className: 'custom-dropdown-item',
    label: (
      <Link href='#' className=''>
        Khuyến mãi
      </Link>
    ),
  },
  {
    key: '2',
    className: 'custom-dropdown-item',
    label: (
      <Link href='#' className=''>
        Tuyển dụng
      </Link>
    ),
  },
];

export default function Header() {
  const [cart, setCart] = useRecoilState(cartState);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logged, setLogged] = useRecoilState(loggedState);
  const router = useRouter();
  const { mutate: findProduct } = useMutationFindProduct();
  const [listFindProduct, setListFindProduct] = useState<any>([]);

  useEffect(() => {
    const itemCount = cart.length;
    setCartItemCount(itemCount);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
    setLogged(false);
  };

  const handleInputChange = (e: any) => {
    const searchTerm = e.target.value;

    if (searchTerm === '') {
      findProduct(
        { name: '' },
        {
          onSuccess: (data: any) => {
            console.log(data?.products);
            setListFindProduct(data?.products);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    } else {
      findProduct(
        { name: searchTerm },
        {
          onSuccess: (data: any) => {
            console.log(data?.products);
            setListFindProduct(data?.products);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <button>Thông tin cá nhân</button>,
    },
    {
      key: '2',
      label: (
        <button rel='noopener noreferrer' onClick={() => setIsModalOpen(true)}>
          Đổi mật khẩu
        </button>
      ),
    },
    {
      key: '3',
      label: <button rel='noopener noreferrer'>Thông tin đơn hàng</button>,
    },
    {
      key: '4',
      label: (
        <button onClick={handleLogout} rel='noopener noreferrer'>
          Đăng xuất
        </button>
      ),
    },
  ];
  const userFindProducts: MenuProps['items'] = listFindProduct?.map((item: any) => ({
    key: `${item._id}`,
    label: (
      <div className='flex gap-[20px]'>
        <img src={`http://localhost:5000/${item.images}`} className='w-[20px] h-[20px]' alt='' />
        <Link href={`product/${item?._id}`}>{item.name}</Link>
      </div>
    ),
  }));

  return (
    <>
      <div className='w-full bg-[#00C42E] text-white '>
        <div className='flex w-full max-w-[1440px] mx-auto justify-between items-center h-[50px] py-[5px] px-16'>
          <div className='flex items-center gap-[20px]'>
            <Link href='#'>
              <FaFacebook />
            </Link>
            <Link href='#'>
              <FaInstagram />
            </Link>
            <Link href='#'>
              <FaTiktok />
            </Link>
            <Link href='#'>
              <FaTwitter />
            </Link>
            <Link href='#'>
              <FaYoutube />
            </Link>
          </div>
          <div className='justify-between w-full flex gap-[10px] items-center flex-1 max-w-[500px] text-black h-full bg-white mx-auto items-centers rounded-[8px] px-[8px]'>
            <Dropdown className='w-full' menu={{ items: userFindProducts }} trigger={['click']}>
              <Input
                onChange={handleInputChange}
                type='text'
                placeholder='Tìm kiếm'
                className='flex-1 outline-none border-none active:!border-none'
              />
            </Dropdown>
            <FaSearch className='cursor-pointer' />
          </div>
          <div>
            {logged ? (
              <div className='flex gap-[10px] items-center'>
                <p>Huy</p>
                <Dropdown menu={{ items: userMenuItems }} placement='bottomRight'>
                  <button>
                    <FaCircleUser className='text-[28px]' />
                  </button>
                </Dropdown>
              </div>
            ) : (
              <div className='flex gap-[8px] items-center'>
                <Link className='hover:text-[#cccc] transition-all text-[16px] font-[400] leading-[24px]' href='/login'>
                  Đăng nhập
                </Link>
                <p className='w-[1px] h-[10px] bg-black'></p>
                <Link
                  className='hover:text-[#cccc] transition-all text-[16px] font-[400] leading-[24px]'
                  href='/register'
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='border-b-[1px] border-[#000]'>
        <div className='w-full max-w-[1440px] mx-auto flex justify-between items-center text-[#000] h-[60px] px-16'>
          <Link href='/'>
            <Image src='/image/home/logo.jpg' width={50} height={20} alt='' />
          </Link>
          <div>
            <ul className='flex items-center gap-[20px] font-[700]'>
              <li className='cursor-pointer transition-all'>
                <Dropdown menu={{ items: productMenuItems }} overlayClassName='custom-dropdown-menu'>
                  <button className='flex items-center gap-[5px]'>
                    Sản phẩm <DownOutlined className='text-[13px]' />
                  </button>
                </Dropdown>
              </li>
              <li className='cursor-pointer'>
                <Dropdown menu={{ items: userNewsMenu }} overlayClassName='custom-dropdown-menu'>
                  <button className='flex items-center gap-[5px] '>
                    Tin tức <DownOutlined className='text-[13px]' />
                  </button>
                </Dropdown>
              </li>
              <li className='cursor-pointer'>
                <Link href='/season-fruits'>Mùa trái cây thế giới</Link>
              </li>
              <li className='cursor-pointer'>
                <Link href='/introduce'>Giới thiệu</Link>
              </li>
              <li className='cursor-pointer'>
                <Link href='#'>Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div className='flex gap-[50px] items-center'>
            {cartItemCount > 0 ? (
              <Link href='/shopping-cart' className='relative'>
                <FaBasketShopping className='text-black cursor-pointer text-[40px]' />
                <span className='text-[14px] bg-red-500 rounded-full px-2 py-1 text-white absolute top-[-15px] right-[-10px]'>
                  {cartItemCount}
                </span>
              </Link>
            ) : (
              <Link href='/shopping-cart'>
                <FaBasketShopping className='text-black cursor-pointer text-[30px]' />
              </Link>
            )}
          </div>
        </div>
      </div>
      <ChangePassWordModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
