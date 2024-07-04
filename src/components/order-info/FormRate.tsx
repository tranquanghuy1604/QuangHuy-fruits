import { useQueryGetOrders } from '@/api/orderApi';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

export default function FormRate({ item, open, onClose }: any) {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal centered open={open} onCancel={onClose} footer={false}>
      <Form name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
        <Form.Item label='Sản phẩm' name='product_name' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Select
            className='h-[50px]'
            placeholder='Sản phẩm'
            options={item?.map((itemOrder: any) => ({
              value: itemOrder?.status === 'finish' ? itemOrder?._id : '',
              label: itemOrder?.status === 'finish' ? itemOrder?.product_name.join(', ') : '',
            }))}
          />
        </Form.Item>
        <Form.Item label='Đánh giá' name='rate' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Select
            className='h-[50px]'
            placeholder='Sản phẩm'
            options={[
              {
                value: 1,
                label: (
                  <div>
                    <FaStar />
                  </div>
                ),
              },
              {
                value: 2,
                label: (
                  <div className='flex gap-[10px]'>
                    {' '}
                    <FaStar /> <FaStar />
                  </div>
                ),
              },
              {
                value: 3,
                label: (
                  <div className='flex gap-[10px]'>
                    {' '}
                    <FaStar /> <FaStar /> <FaStar />
                  </div>
                ),
              },
              {
                value: 4,
                label: (
                  <div className='flex gap-[10px]'>
                    {' '}
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </div>
                ),
              },
              {
                value: 5,
                label: (
                  <div className='flex gap-[10px]'>
                    {' '}
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </div>
                ),
              },
            ]}
          />
        </Form.Item>

        <Form.Item label='Nội dung' name='content'>
          <Input.TextArea style={{ minHeight: 100 }} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full min-h-[50px]'>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
