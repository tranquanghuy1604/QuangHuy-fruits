'use client';
import { useQueryGetCategories } from '@/api/categoryApi';
import { useQueryGetProductByCategory } from '@/api/productApi';
import { useQueryGetAllPromotion } from '@/api/promotionApi';
import { cartState } from '@/recoil/common.recoil';
import { FormatPrice, FormatUrl } from '@/utils/fomartPrice';
import { Button, List, Pagination } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ImportedFruitView() {
  const [cart, setCart] = useRecoilState(cartState);
  const { data } = useQueryGetCategories();
  const { data: dataPromotion } = useQueryGetAllPromotion();
  const listPromotion = dataPromotion as any;
  const dataCategory = data as any;
  const { data: dataProductByCategory } = useQueryGetProductByCategory({
    category_id: dataCategory && dataCategory[1]?._id,
  });
  const dataProductCategory = dataProductByCategory as any;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const addToCart = (item: any) => {
    const promotion = getPromotionalPrice(item);
    const price = promotion ? item.price - item.price * (promotion.discount / 100) : item.price;

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

  const getPromotionalPrice = (item: any) => {
    const promotion = listPromotion?.find((promotion: any) => promotion?.product_id === item?._id);
    return promotion;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataProductCategory && dataProductCategory?.slice(startIndex, endIndex);
  return (
    <div className='text-[#000]'>
      <div className='mt-[50px]'>
        <p className='uppercase text-[28px] font-[700]'>
          <span className='text-[#cccc]'>trang chủ /</span> Hoa quả nhập khẩu
        </p>
      </div>
      <div>
        <div className='grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[40px] mt-[40px]'>
          {dataProductCategory &&
            currentData.map((item: any) => {
              const promoPrice = getPromotionalPrice(item);
              return (
                <div key={item._id} className='w-full bg-white border-[1px] p-6 rounded-md shadow-lg'>
                  <Link href={`/product/${FormatUrl(item._id)}`}>
                    <div className='overflow-hidden'>
                      <img
                        src={`http://localhost:5000/${item.images}`}
                        className='w-full h-[300px] lg:h-[300px] xs:h-[200px] cursor-pointer hover:scale-[1.3] transition-all object-cover overflow-hidden'
                        alt=''
                      />
                    </div>
                  </Link>
                  <Link href={`/product/${FormatUrl(item._id)}`}>
                    <p className='cursor-pointer mt-[20px]'>{item.name}</p>
                  </Link>

                  <p className='mt-[10px]'>
                    {promoPrice ? (
                      <>
                        <span className='line-through'>{FormatPrice(item.price)}đ/kg</span>
                        <span className='ml-2 text-red-500'>
                          {FormatPrice(item.price - item.price * (promoPrice.discount / 100))}đ/kg
                        </span>
                      </>
                    ) : (
                      `${FormatPrice(item.price)}đ/kg`
                    )}
                  </p>

                  <Button className='mt-[20px]' type='primary' onClick={() => addToCart(item)}>
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              );
            })}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dataCategory?.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          className='mt-[30px] flex justify-center'
        />
      </div>
    </div>
  );
}
