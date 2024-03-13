import React, { useEffect } from 'react';
import { DatePicker, Form, Input, Select, Button, Space, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateTask = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage('user');

  useEffect(() => {
    if (!getItem()) {
      navigate('/');
    }
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (fieldsValues) => {
    try {
      const token = getItem();
      const values = {
        ...fieldsValues,
        priority: fieldsValues.priority.toUpperCase(),
        start_date: moment(fieldsValues['start_date']).format('YYYY-MM-DD'),
        end_date: moment(fieldsValues['end_date']).format('YYYY-MM-DD'),
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task`,
        {
          ...values,
          status: 'OPEN',
        },
        {
          headers: {
            'access-token': token,
          },
        }
      );
      if (res.status === 201) {
        onReset();
        messageApi.open({
          type: 'success',
          content: 'Task Created Successfully',
        });
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
      <h1>Add tasks to todo list</h1>
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

        <Form.Item name="description" label="Description">
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
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
          <Form.Item label="Start Date" name="start_date">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item label="End Date" name="end_date">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default CreateTask;
