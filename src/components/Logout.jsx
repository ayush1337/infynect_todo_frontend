import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const [logout, setLogout] = useState(false);
  const { removeItem } = useLocalStorage('user');
  const navigate = useNavigate();
  const handleLogout = () => {
    removeItem();
    navigate('/');
    window.location.reload();
  };
  useEffect(() => {}, [logout]);

  return (
    <Button
      onClick={() => {
        handleLogout();
        setLogout(() => true);
      }}
    >
      Logout
      <LogoutOutlined />
    </Button>
  );
};

export default Logout;
