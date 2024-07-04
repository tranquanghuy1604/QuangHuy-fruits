'use client';
import { useQueryGetOrders } from '@/api/orderApi';
import { useMutationCreateRate } from '@/api/rateApi';
import { Button, Form, Input, Modal, Rate, Select } from 'antd';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useForm } from 'antd/es/form/Form';

export default function FormRate({ item, open, onClose }: any) {
  const { mutate: createRate } = useMutationCreateRate();
  const [rateValue, setRateValue] = useState(0);
  const [form] = useForm();

  const eligibleOrders = item?.filter((itemOrder: any) => itemOrder?.status === 'finish') || [];
  const isSelectDisabled = eligibleOrders.length === 0;

  const onFinish = (values: any) => {
    createRate(
      { order_id: values.product_name, rate: values.rate, content: values.content },
      {
        onSuccess: (data) => {
          toast.success('Đánh giá thành công');
          onClose();
        },
      },
    );
    form.resetFields();
  };

  return (
    <Modal centered open={open} onCancel={onClose} footer={false}>
      <Form form={form} name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
        <Form.Item label='Đánh giá' name='rate' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Rate onChange={setRateValue} value={rateValue} />
        </Form.Item>

        <Form.Item label='Đơn hàng' name='product_name' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Select
            className='h-[50px]'
            placeholder='Đơn hàng'
            options={eligibleOrders?.map((itemOrder: any) => ({
              value: itemOrder._id,
              label: itemOrder.product_name
                .map((itemProduct: any) => itemProduct.productName + ' x ' + itemProduct.quantity)
                .join(', '),
            }))}
            disabled={isSelectDisabled}
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
