import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

export default function FormRate({ open, onClose }: any) {
  const onFinish = (values: any) => {};
  return (
    <Modal open={open} onCancel={onClose} footer={false}>
      <Form name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
        <Form.Item label='Đánh giá' name='rate' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Input />
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
