import React from "react";
import { Button, Layout, Progress, Avatar} from "antd";
import {
  PoweroffOutlined
  } from '@ant-design/icons';
import { useState } from "react";
import { fetchAPIDeleteAll, fetchAPILogout } from "../../api/api";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function RightSider({openAvatarModal, url, setUrl, userName}) {
  const defaultUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGYVzWTuDXyCf02RIHia-_X-mnkW_476LQjyc9tZfpOg&s'
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  
  const deleteAll = async () => {
    console.log(url)
    const res = await fetchAPIDeleteAll()
    return res
  }

  const logOut = async () => {
    const res = await fetchAPILogout()
    navigate('/login')
    return res
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
          margin: "16px 16px 0 16px",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <h2>Hi, {userName}!</h2>
        
        <Avatar size={64} src={url == null ? defaultUrl : url} />
        <br />
        <br />
        <br />
        <div>
          <Button onClick={openAvatarModal}>Change avatar</Button>
          <Button onClick={logOut}>Logout<PoweroffOutlined /></Button>
        </div>
        
        
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
        <Button onClick={deleteAll}>Delete all data</Button>
      </div>
    </Sider>
  );
}