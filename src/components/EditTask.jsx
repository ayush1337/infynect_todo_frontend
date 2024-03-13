import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select, Button, Space, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;
import dayjs from 'dayjs';
const EditTask = () => {
  const { taskID } = useParams();
  const [taskDefault, setTaskDefault] = useState({});
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage('user');
  const token = getItem();

  useEffect(() => {
    if (!getItem()) {
      navigate('/');
    }
    const fetchSingleTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/task/${taskID}`,
          {
            headers: {
              'access-token': token,
            },
          }
        );
        setTaskDefault(() => res.data);
        form.resetFields();
      } catch (error) {}
    };
    fetchSingleTask();
  }, []);

  const onFinish = async (fieldsValues) => {
    try {
      const token = getItem();
      console.log(token);
      const values = {
        ...fieldsValues,
        priority: fieldsValues.priority.toUpperCase(),
        start_date: moment(fieldsValues['start_date']).format('YYYY-MM-DD'),
        end_date: moment(fieldsValues['end_date']).format('YYYY-MM-DD'),
      };
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/task/${taskID}`,
        {
          ...values,
        },
        {
          headers: {
            'access-token': token,
          },
        }
      );
      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Task Updated',
        });
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
      });
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      {contextHolder}
      <h1>Update Task</h1>
      <Form
        style={{
          maxWidth: 600,
        }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="task_name"
          label="Task Name"
          tooltip="Enter what you wish todo?"
          initialValue={taskDefault.task_name}
          rules={[
            {
              required: true,
              message: 'Please enter task name',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          initialValue={taskDefault.description}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          initialValue={taskDefault.priority}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select priority of the task" allowClear>
            <Option value="Highest">Highest</Option>
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>

        <div className="flex items-center gap-4">
          <Form.Item
            label="Start Date"
            name="start_date"
            initialValue={dayjs(taskDefault.start_date)}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="end_date"
            initialValue={dayjs(taskDefault.end_date)}
          >
            <DatePicker />
          </Form.Item>
        </div>

        <Form.Item
          name="status"
          label="Status"
          initialValue={taskDefault.status}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select priority of the task" allowClear>
            <Option value="OPEN">OPEN</Option>
            <Option value="IN PROGRESS">IN PROGRESS</Option>
            <Option value="COMPLETED">COMPLETED</Option>
          </Select>
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit">
            Update Task
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default EditTask;
