import {Button, Input, Layout, input} from 'antd'
import { Outlet, NavLink } from 'react-router-dom'
import MySider from './MySider'
import { useState } from 'react';
import {
    FolderAddOutlined
  } from '@ant-design/icons';
import HandleModalOpen from '../Pages/HandleModalOpen';
import HandleNewFolder from '../Pages/HandleNewFolder';
import RightSider from './RightSider';

const {Header, Content, Sider} = Layout
const {Search} = Input

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

export default function MainLayout () {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDirModalOpen, setIsDirModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true)
    }
    const openDirModal = () => {
        setIsDirModalOpen(true)
    }

    const menuItems = [
        getItem(<NavLink to="/">View all task</NavLink>, "1"),
        getItem(<NavLink to="/today">View today task</NavLink>,"2"),
        getItem(<NavLink to="/important">View important task</NavLink>,"3"),
        getItem(<NavLink to="/completed">View completed task</NavLink>,"4"),
        getItem(<NavLink to="/uncompleted">View uncompleted task</NavLink>,"5"),
        getItem("Quản lý", "sub2", null, [
            getItem(
            <NavLink to="/dir/centre-management">Danh sách trung tâm</NavLink>,
            "6"
            ),
            getItem(
            <NavLink to="/dir/registry-management">Danh sách đăng kiểm</NavLink>,
            "7"
            ),
            getItem(
            <Button onClick={openDirModal}><FolderAddOutlined /> New</Button>,"8")
        ]),
        ];

    return (
        <Layout>
            <HandleModalOpen
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            //registerData={registerData}
            //setRegisterData={setRegisterData}
          />
            <HandleNewFolder
            isModalOpen={isDirModalOpen}
            setIsModalOpen={setIsDirModalOpen}
             />
            <MySider items={menuItems} openModal={openModal} />
            <Layout>
                <Header
                    style={{
                        backgroundColor: "#F0EFEF",
                        height: 80
                    }}
                >
                    <Search
                        style={{
                            marginTop: 20,
                            width: 300,
                        }}
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        //onSearch={onSearch}
                    />
                </Header>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
            <RightSider />
        </Layout>
    )
}