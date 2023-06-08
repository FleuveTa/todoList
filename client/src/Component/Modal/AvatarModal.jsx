import { Modal, message, Form, Input, Radio } from "antd";
import React, { useState } from "react";
import { changeUrlAPI } from "../../api/api";

const {TextArea} = Input
export default function AvatarModal({
  isModalOpen,
  setIsModalOpen,
  url,
  setUrl
}) {

  const handleOk = async () => {
    console.log(url)
    const res = await changeUrlAPI(url)
    setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    console.log(url)
  };

  return (
    <Modal
      title="Change your avatar"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
        <Input placeholder="Paste your image url here"  name="img_url" onChange={handleChange} /> 
    </Modal>
  );
}