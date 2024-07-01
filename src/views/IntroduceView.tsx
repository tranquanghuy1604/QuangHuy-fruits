import Image from 'next/image';
import React from 'react';

export default function IntroduceView() {
  return (
    <div className='text-[#000] mt-[50px] pb-[50px]'>
      <div>
        <Image width={1440} height={600} src='/image/home/banner-1.jpg' alt='' />
      </div>
      <div className='mt-[50px]'>
        <h2 className='text-[28px] font-[700] uppercase'>Giới thiệu về Quang Huy fruits</h2>
        <div className='flex mt-[30px] justify-between items-center'>
          <div className='w-[49%]'>
            <p className='text-[18px] leading-[32px]'>
              Quang Huy Fruits là chuỗi cửa hàng trái cây sạch hàng đầu Việt Nam. Với sứ mệnh mang đến cho người tiêu
              dùng Việt Nam những sản phẩm trái cây mang thương hiệu Việt và trái cây ngoại nhập với chất lượng tốt
              nhất. Hãy cùng Quang Huy Fruits chăm sóc sức khỏe gia đình bạn. Tại Quang Huy Fruits, các sản phẩm đều đạt
              tiêu chuẩn VietGAP hoặc GlobalGAP. Các sản phẩm tại Quang Huy Fruits được bảo quản tốt nhất, đảm bảo chất
              lượng nhất khi đến tay người tiêu dùng. Các đối tác của Quang Huy Fruits là những nhà vườn, nhà xuất khẩu,
              hợp tác xã hoặc những thương hiệu trái cây đã đươc kiểm chứng trong nước và trên thế giới. Nguồn gốc sản
              phẩm luôn rõ ràng, có khả năng truy xuất nguồn gốc với đầy đủ thông tin và chứng nhận, chứng chỉ, xuất xứ
              theo quy định.
            </p>
          </div>
          <div className='w-[49%]'>
            <Image width={1000} height={400} src='/image/home/introduct-img.jpg' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}
