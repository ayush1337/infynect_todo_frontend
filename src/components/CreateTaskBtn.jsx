import React from 'react';
import { Button } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const CreateTaskBtn = () => {
  return (
    <Link to="/add-task" className="md:ml-auto">
      <Button type="primary">
        <AppstoreAddOutlined />
        Add Task
      </Button>
    </Link>
  );
};

export default CreateTaskBtn;
