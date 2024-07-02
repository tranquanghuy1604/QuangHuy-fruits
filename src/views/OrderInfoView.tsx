'use client';
import React from 'react';
import { Steps } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';

const { Step } = Steps;

export default function OrderInfoView() {
  return (
    <div className='container mx-auto mt-[100px]'>
      <Steps current={2}>
        <Step title='Đơn Hàng Đã Đặt' icon={<SolutionOutlined />} />
        <Step title='Đã Xác Nhận Thông Tin Thanh Toán' icon={<CheckCircleOutlined />} />
        <Step title='Chờ Lấy Hàng' />
        <Step title='Đang Giao' icon={<SmileOutlined />} />
        <Step title='Đánh Giá' />
      </Steps>
    </div>
  );
}
