import { Modal, message, Form, Input, Radio } from "antd";
import React, { useState } from "react";

const {TextArea} = Input
export default function HandleNewFolder({
  isModalOpen,
  setIsModalOpen,
}) {
  const [modalCentreData, setModalCentreData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = async () => {
    setIsModalOpen(false)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setModalCentreData({
      ...modalCentreData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      title="Add new directory"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
        <Form
            name="dir_form"
            //onFinish={onFinish}
            style={{
            maxWidth: 600,
            }}
        >
            <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
                {
                required: true,
                },
            ]}
            >
                <Input />
            </Form.Item>
        </Form>
      
    </Modal>
  );
}