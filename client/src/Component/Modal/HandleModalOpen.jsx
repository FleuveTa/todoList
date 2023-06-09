import { Modal, message, Form, Input, Checkbox, DatePicker, Select, Spin } from "antd";
import React, { useState, useContext } from "react";
import { addNewTaskAPI } from "../../api/api";

const {TextArea} = Input
export default function HandleModalOpen({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  userDir
}) {

  const options = []
  for (let i=0; i<userDir.length; i++) {
    options.push({ value: userDir[i].name, label: userDir[i].name })
  }
  
  const handleOk = async () => {
    setIsModalOpen(false)
    const res = await addNewTaskAPI(modalData)
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

  const handleCheckChange1 = (e) => {
    setModalData({
      ...modalData,
      ['important']: e.target.checked === true ? 1 : 0,
    });
  }

  const handleCheckChange2 = (e) => {
    setModalData({
      ...modalData,
      ['completed']: e.target.checked === true ? 1 : 0,
    });
  }

  const handleDateChange = (date, dateString) => {
    console.log(dateString)
    setModalData({
      ...modalData,
      ['date']: dateString,
    });
  };

  const handleSelectChange = (value) => {
    setModalData({
      ...modalData,
      ['directory']: value,
    });
  };
  

  return (
    <div
            style={{
                marginLeft: 20,
            }}
        >
            {!userDir ? 
            (<Spin />) 
            : 
            (
              <Modal
              title="Add new task"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
            
                        <Input placeholder="Tiltle" name="title" onChange={handleChange} />
                   
                        <DatePicker placeholder="Create date" name="date" onChange={handleDateChange} />
                    
                        <TextArea placeholder="description" name="description" onChange={handleChange} />
                    
                        <label>Choose directory</label>
                        <Select
                          //defaultValue={`${userDir[0].name}`}
                          style={{ width: 150 }}
                          onChange={handleSelectChange}
                          options={options}
                        />
                        <br />
                        <Checkbox onChange={handleCheckChange1}>Mark as important</Checkbox>
                        <br />
                        <Checkbox onChange={handleCheckChange2}>Mark as completed!</Checkbox>
            </Modal>
            ) }
            
        </div>

  );
}