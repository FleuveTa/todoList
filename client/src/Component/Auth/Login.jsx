import { Button, Input, Space, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAPIpostLogin } from "../../api/api";

const { Title } = Typography;

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  //const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleKeyUp = (e) => {
    if (e.key == "Enter") {
      handleLogin();
    }
  };

  const inputCheck = () => {
    if (loginData.email == "" || loginData.password == "") {
      messageApi.error("Xin nhập đầy đủ thông tin.")
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      console.log(loginData)
      const res = await fetchAPIpostLogin(loginData);
      const response = await res.json();
      console.log('here')
      const { message } = response;
      if (res.ok) {
        console.log('success')
      } else {
        messageApi.error(message);
      }
    } catch (error) {}
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
        <Title>Đăng nhập</Title>

        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined />}
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
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Space>
    </div>
  );
}