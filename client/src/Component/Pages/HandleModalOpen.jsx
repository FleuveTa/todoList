import { Modal, message, Form, Input, Checkbox, DatePicker, Select } from "antd";
import React, { useState } from "react";

const {TextArea} = Input
export default function HandleModalOpen({
  isModalOpen,
  setIsModalOpen,
}) {
  const [modalData, setModalData] = useState({
    'title' : '',
    'description' : '',
    'date' : null,
    'directory' : '',
    'completed' : 0,
    'important' : 0,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = async () => {
    setIsModalOpen(false)
    console.log(modalData)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    console.log(e.target.name)
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
    console.log(modalData)
  };

  const handleCheckChange = (e) => {
    console.log(e)
  }

  const handleDateChange = (date, dateString) => {
    console.log(dateString)
    setModalData({
      ...modalData,
      ['date']: dateString,
    });
  };
  

  return (
    <Modal
      title="Add new task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
    
                <Input name="title" onChange={handleChange} />
           
                <DatePicker name="date" onChange={handleDateChange} />
            
                <TextArea name="description" onChange={handleChange} />
            
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true },
                  ]}
                />
           
                <Checkbox />
            
                <Checkbox />
    </Modal>
  );
}