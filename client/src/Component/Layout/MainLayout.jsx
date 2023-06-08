import {Button, Input, Layout} from 'antd'
import { Outlet, NavLink } from 'react-router-dom'
import MySider from './MySider'
import { useContext, useState, useEffect, createContext } from 'react';
import {
    FolderAddOutlined, ThunderboltFilled
  } from '@ant-design/icons';
import HandleModalOpen from '../Modal/HandleModalOpen';
import HandleNewFolder from '../Modal/HandleNewFolder';
import RightSider from './RightSider';
import AvatarModal from '../Modal/AvatarModal';
import AppContext from '../../context/AppContext';
import { getAllTask, getDirofUser } from '../../api/api';

const {Header, Content} = Layout
const {Search} = Input
export const TaskContext = createContext()

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

export default function MainLayout () {
    const [userDir, setUserDir] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [modalData, setModalData] = useState({
        'title' : '',
        'description' : '',
        'date' : null,
        'directory' : '',
        'completed' : 0,
        'important' : 0,
      });

    useEffect(() => {
        (async () => {
          const response = await getDirofUser();
          const response2 = await getAllTask();
          console.log(response)
          console.log(response2)
          setUserDir(response);
          setTasks(response2)
        })();
      }, []);

    const {user} = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDirModalOpen, setIsDirModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [url, setUrl] = useState(user.img_url)

    const addTask = (newTask) => {
        console.log('trigged')
        setTasks([...tasks, newTask]);
        console.log(tasks)
      };

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
        ]),
        ];

        for (let i=0; i<userDir.length; i++) {
            menuItems[5].children.push(getItem(<NavLink to={`/dir/${userDir[i].name}`}>Thư mục {userDir[i].name}</NavLink>,`${6+i}`))
        }
        

    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            <Layout>
            <HandleModalOpen
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalData={modalData}
            setModalData={setModalData}
            userDir={userDir}
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
        </TaskContext.Provider>
        
    )
}