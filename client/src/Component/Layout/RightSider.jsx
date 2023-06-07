import React from "react";
import { Button, Layout, Progress, Avatar } from "antd";
import {
    UserOutlined
  } from '@ant-design/icons';
import { useState } from "react";

const { Sider } = Layout;

export default function RightSider({ items, openModal }) {
  const [collapsed, setCollapsed] = useState(false);
  const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s'
  return (
    <Sider
      width={300}
      className="sider-container"
      breakpoint="lg"
      collapsedWidth="60"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
        setCollapsed(collapsed);
      }}
    >
      <div
        style={{
          margin: "16px 16px 0 16px",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <h2>Hi, User!</h2>
        <Avatar size={64} src={url} />
        <br />
        <br />
        <br />
        <br />
        <p>Tasks today {"1/1"}</p>
        <Progress percent={100} showInfo={false} />
        <p>All task {"2/2"}</p>
        <Progress percent={50} showInfo={false} />
      </div>
      <div
        style={{
            marginLeft : '90px',
            color: "#FFFFFF",
            position: 'absolute',
            bottom: '20px',
            textAlign: "center",
          }}
      >
        <Button>Delete all data</Button>
      </div>
    </Sider>
  );
}