'use client';
import { useQueryGetProduct } from '@/api/productApi';
import { useQueryGetPromotion } from '@/api/promotionApi';
import { cartState } from '@/recoil/common.recoil';
import { FormatPrice } from '@/utils/fomartPrice';
import { Button, Image, InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ProductDetails() {
  const [numberValue, setNumberValue] = useState<number>(1);
  const [cart, setCart] = useRecoilState(cartState);
  const params = useParams();
  const { data: item } = useQueryGetProduct(params.productName);
  const itemProduct = item as any;
  const { data: promotion } = useQueryGetPromotion(params.productName);
  const promotionPrice = promotion as any;

  const handleIncrease = () => {
    setNumberValue((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setNumberValue((prev) => Math.max(prev - 1, 1));
  };

  const onChange: InputNumberProps['onChange'] = (value: any) => {
    setNumberValue(value);
  };

  const addToCart = () => {
    const existingItem = cart.find((cartItem: any) => cartItem._id === itemProduct?._id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem: any) =>
        cartItem._id === itemProduct?._id
          ? { ...cartItem, quantity: cartItem.quantity + numberValue, images: itemProduct?.images }
          : cartItem,
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newItem = {
        _id: itemProduct?._id,
        name: itemProduct?.name,
        price: itemProduct?.price,
        quantity: numberValue,
        images: itemProduct?.images,
      };
      const newCart = [...cart, newItem];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };
  return (
    <div>
      <div className='text-[#000]'>
        <div className='flex mt-[50px] justify-between'>
          <div className='w-[35%]'>
            <Image
              src={`http://localhost:5000/${itemProduct?.images}`}
              alt=''
              width={500}
              height={600}
              className='object-cover'
            />
          </div>
          <div className='w-[62%] pt-[20px]'>
            <p className='uppercase text-[28px] font-[700]'>
              <span className='text-[#cccc]'>trang chủ /</span> Hoa quả nhập khẩu
            </p>
            <h3 className=' mt-[10px] text-[24px] font-[700]'>{itemProduct?.name}</h3>
            <div className='w-[30px] my-[5px] bg-[#ccc] h-[3px]'></div>
            {promotionPrice?.product_id === itemProduct?._id ? (
              <>
                <span className='line-through'>{FormatPrice(itemProduct?.price)}đ/kg</span>
                <span className='ml-2 text-red-500'>
                  {FormatPrice(itemProduct?.price - itemProduct?.price * (promotionPrice?.discount / 100))}đ/kg
                </span>
              </>
            ) : (
              `${FormatPrice(itemProduct?.price)}đ/kg`
            )}
            <p className='mt-[10px] italic'>
              (Giá chỉ mang tính chất tham khảo. Vui lòng liên hệ hotline: 0862552155 để được cập nhật bảng giá theo
              ngày)
            </p>
            <p className='mt-[10px]'>
              Quang Huy Fruits là một trong những hệ thống cửa hàng hoa quả nhập khẩu ở Hà Nội cung cấp cho quý khách
              những trái {itemProduct?.name} Úc tươi ngon nhất cũng như các loại hoa quả nhập khẩu, hoa quả vùng miền
              khác
            </p>
            <div className='mt-[20px] flex gap-[30px]'>
              <div className='flex items-center '>
                <button onClick={handleDecrease} className='px-[10px] bg-[#cccc] h-[30px]'>
                  -
                </button>
                <InputNumber
                  value={numberValue}
                  type='number'
                  className='h-[30px] w-[50px] outline-none rounded-none input-shop'
                  controls={false}
                  onChange={onChange}
                />
                <button onClick={handleIncrease} className='px-[10px] bg-[#cccc] h-[30px]'>
                  +
                </button>
              </div>
              <Button type='primary' onClick={addToCart}>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
        <div className='mt-[50px]'>
          <h3 className='text-[28px] font-[700] mt-[40px]'>Giới thiệu {itemProduct?.name}</h3>
          <div className='mt-[10px] text-[18px] font-[500] leading-[28px]'>
            <p>{itemProduct?.name} Úc lần đầu tiên được phát hiện tại nhà vườn ở Brazil năm 1820.</p>
            <p>
              {itemProduct?.name} Úc bắt đầu được nhân rộng các nước khác trên thế giới như Mĩ, Bắc Phi, Địa Trung Hải
              và cả Australia.
            </p>
            <p>{itemProduct?.name} Úc là một trong những loại cam phổ biến nhất bây giờ.</p>
            <p>{itemProduct?.name} Úc được người tiêu dùng trên thế giới yêu thích.</p>
          </div>
          <div>
            <Image width={500} className='mx-auto' src={`http://localhost:5000/${itemProduct?.images}`} alt='' />
          </div>
          <h3 className='text-[28px] font-[700] mt-[40px]'>Đặc điểm</h3>
          <div className='mt-[10px] text-[18px] font-[500] leading-[28px]'>
            <p>{itemProduct?.name} Úc thường to, tròn. Màu vàng óng ả tươi sáng.</p>
            <p>{itemProduct?.name} Úc có phần vỏ mỏng, thơm chứa nhiều tinh dầu tự nhiên.</p>
            <p>
              Múi {itemProduct?.name} Úc to, tép mọng nước, ít xơ, vị ngọt dịu, thơm mát và đặc trưng ai ai cũng thích
              là hầu như không có hạt.
            </p>
          </div>
          <h3 className='text-[28px] font-[700] mt-[40px]'>Sử dụng và bảo quản</h3>
          <div className='mt-[10px] text-[18px] font-[500] leading-[28px]'>
            <p>
              {itemProduct?.name} Úc vỏ mỏng, ít xơ, ăn tươi là ngon nhất và giúp cơ thể hấp thụ được toàn bộ chất dinh
              dưỡng có trong quả.
            </p>
            <p>
              {itemProduct?.name} Úc là cam nhập khẩu nên tốt nhất để trong tủ lạnh với nhiệt độ dưới 10 độ C, tránh
              tiếp xúc với các loại thực phẩm gây mùi và ẩm ước.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
