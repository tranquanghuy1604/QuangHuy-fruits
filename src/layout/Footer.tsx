import { EnvironmentOutlined, FacebookOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Image from 'next/image';
export default function Footer() {
  return (
    <div className='bg-gray-800 text-white py-10 mt-[40px] md:mt-[80px] px-[10px]'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 2xl:px-[20px]'>
        <div className='flex flex-col items-center md:items-start'>
          <Image width={100} height={100} src='/image/home/logo.png' alt='Quang Huy Fruits' className='mb-4' />
          <h2 className='text-lg font-bold mb-2'>Về chúng tôi</h2>
          <p className='text-sm'>
            Chuyên cung cấp các loại hoa quả nhập khẩu, nội địa và các loại thực phẩm từ thiên nhiên.
          </p>
        </div>

        <div className='flex flex-col items-center md:items-start'>
          <h2 className='text-lg font-bold mb-2'>Liên hệ</h2>
          <p className='text-sm flex items-center mb-2'>
            <EnvironmentOutlined className='mr-2' /> 175 Tây Sơn, Hà Nội
          </p>
          <p className='text-sm flex items-center mb-2'>
            <PhoneOutlined className='mr-2' /> 0123456789 - 0987654321
          </p>
          <p className='text-sm flex items-center mb-2'>
            <MailOutlined className='mr-2' /> thuyloi@gmail.com
          </p>
          <p className='text-sm flex items-center mb-2'>
            <FacebookOutlined className='mr-2' /> ThuyLoifb.com
          </p>
        </div>

        <div className='flex flex-col items-center md:items-start'>
          <h2 className='text-lg font-bold mb-2'>Tin tức</h2>
          <p className='text-sm mb-2'>Kỹ thuật trồng rau sạch trong chậu xốp tại nhà đơn giản</p>
          <p className='text-sm mb-2'>Eat Clean – bí kíp để có thân hình xinh như mơ của cô nàng 9x</p>
          <p className='text-sm mb-2'>Lấy lại vòng eo con kiến nhờ công thức đơn giản từ củ đậu và rau cải</p>
          <p className='text-sm mb-2'>KM: Tháng giải phóng mỡ thừa, da xấu, độc tố trong cơ thể</p>
        </div>

        <div className='flex flex-col items-center md:items-start'>
          <h2 className='text-lg font-bold mb-2'>VỀ CHÚNG TÔI</h2>
          <p className='text-sm mb-2'>Giới thiệu</p>
          <p className='text-sm mb-2'>Lĩnh vực hoạt động</p>
          <p className='text-sm mb-2'>Chính sách chất lượng</p>
          <p className='text-sm mb-2'>Triết lý kinh doanh</p>
          <p className='text-sm mb-2'>Năng lực - cơ sở vật chất</p>
        </div>
      </div>
    </div>
  );
}
