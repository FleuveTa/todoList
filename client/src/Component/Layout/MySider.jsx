import React from "react";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";

const { Sider } = Layout;

export default function MySider({ items, openModal }) {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem("selectedKey") || "1"
  );

  const clickItem = (e) => {
    localStorage.setItem("selectedKey", e.key);
    setSelectedKey(e.key);
  };

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
          margin: "25px 16px 0 16px",
          textAlign: "center",
          color: "#B6ADAD",
        }}
      >
        <h2>TO-DO LIST</h2>
        <br />
        <br />
        <Button width={400} onClick={openModal}>Add new task</Button>
      </div>
      
      <br />
      <br />
      <br />

      <Menu
        onClick={clickItem}
        theme="dark"
        //defaultSelectedKeys={[selectedKey]}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}