import { Button, Input, Space, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAPIRegister } from "../../api/api";

const { Title } = Typography;

export default function Register() {
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  //const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleKeyUp = (e) => {
    if (e.key == "Enter") {
      handleRegister();
    }
  };

  const inputCheck = () => {
    if (registerData.email == "" || registerData.password == "") {
      messageApi.error("Xin nhập đầy đủ thông tin.")
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      console.log(registerData)
      const res = await fetchAPIRegister(registerData);
      const response = await res.json();
      const { message } = response;
      console.log(response)
      if (message === 'Register successfully') {
        messageApi.success(message)
      } else {
        messageApi.error(message);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div id="loginDiv">
      {contextHolder}
      <Space
        direction="vertical"
        size="large"
        style={{
          position: "relative",
          width: "80%",
          left: "10%",
          textAlign: "center",
          paddingTop: 100,
        }}
      >
        <Title>Đăng ký tài khoản mới</Title>

        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          name="name"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />

        <Input
          size="large"
          placeholder="Email"
          prefix={<MailOutlined />}
          name="email"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />

        <Input.Password
          size="large"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          name="password"
          onChange={handleChange}
          style={{ width: "100%" }}
          onKeyUp={handleKeyUp}
        />

        <Button
          size="large"
          type="primary"
          style={{ float: "right" }}
          onClick={handleRegister}
        >
          Đăng ký
        </Button>
        <NavLink to='/login'>Tới trang đăng nhập</NavLink>
      </Space>
    </div>
  );
}