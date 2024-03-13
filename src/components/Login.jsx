import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import LOGO from '../assets/todos_logo.png';

const Login = () => {
  const { getItem, setItem } = useLocalStorage('user');

  const navigate = useNavigate();

  useEffect(() => {
    if (getItem()) {
      navigate('/');
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const { user_name, password } = values;

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          user_name,
          password,
        }
      );
      const { token } = res.data;
      setItem(token);
      window.location.reload();
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full min-h-dvh flex items-center justify-center flex-col gap-6">
      <Link to="/" className="w-36">
        <img src={LOGO} alt="logo" className="w-full" />
      </Link>
      <h1>Login</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="user_name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
            <LoginOutlined />
          </Button>
        </Form.Item>
      </Form>

      <div className="text-sm text-gray-400">
        Don't have an account ?{' '}
        <Link to="/register" className="text-gray-500">
          Create here
        </Link>
      </div>
    </div>
  );
};

export default Login;
