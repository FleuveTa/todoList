import {Button, Input, Layout} from 'antd'
import { Outlet, NavLink } from 'react-router-dom'
import MySider from './MySider'
import { useContext, useState, useEffect } from 'react';
import {
    FolderAddOutlined
  } from '@ant-design/icons';
import HandleModalOpen from '../Modal/HandleModalOpen';
import HandleNewFolder from '../Modal/HandleNewFolder';
import RightSider from './RightSider';
import AvatarModal from '../Modal/AvatarModal';
import AppContext from '../../context/AppContext';
import { getDirofUser } from '../../api/api';

const {Header, Content} = Layout
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
    const [userDir, setUserDir] = useState(null);
    useEffect(() => {
        (async () => {
          const response = await getDirofUser();
          console.log(response)
          setUserDir(response);
        })();
      }, []);

    const {user} = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDirModalOpen, setIsDirModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [url, setUrl] = useState(user.img_url)

    

    const openModal = () => {
        setIsModalOpen(true)
    }
    const openDirModal = () => {
        setIsDirModalOpen(true)
    }
    const openAvatarModal = () => {
        setIsAvatarModalOpen(true)
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
            <AvatarModal
            isModalOpen={isAvatarModalOpen}
            setIsModalOpen={setIsAvatarModalOpen}
            url={url}
            setUrl={setUrl}
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
            <RightSider openAvatarModal={openAvatarModal} url={url} setUrl={setUrl} userName={user.name} />
        </Layout>
    )
}