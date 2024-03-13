import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Popconfirm, message, Input } from 'antd';
import formatDate from '../utils/formateDate';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import bufferToHex from '../utils/bufferToHex';
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios from 'axios';
import { priorityColors, statusColors } from '../utils/colors';
import FilterSelect from './FilterSelect';
const { Search } = Input;
const TodoList = ({ todos, fetchAllTodos }) => {
  const { getItem } = useLocalStorage('user');
  const [messageApi, contextHolder] = message.useMessage();
  const [statusFilter, setStatusFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (statusFilter.length > 0)
      queryParams.set('status', statusFilter.join(','));
    if (priorityFilter.length > 0)
      queryParams.set('priority', priorityFilter.join(','));
    if (searchFilter) queryParams.set('search', searchFilter);
    navigate(`?${queryParams.toString()}`);
  }, [statusFilter, priorityFilter, searchFilter, navigate]);

  const handleDelete = async (taskID) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/task/${taskID}`,
        {
          headers: {
            'access-token': getItem(),
          },
        }
      );
      if (res.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'Task Deleted Successfully',
        });
        fetchAllTodos();
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
      });
    }
  };

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 's_no',
      key: 's_no',
    },
    {
      title: 'Task Name',
      dataIndex: 'task_name',
      key: 'task_name',
      render: (text, task) => {
        const id = bufferToHex(task.task_id.data);
        return (
          <Link to={`/todo/${id}`} className="font-semibold">
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </Link>
        );
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',

      render: (text) => (
        <div
          className={`${
            priorityColors[text.toLowerCase()]
          } px-2 py-1 rounded border border-opacity-35 border-solid font-medium text-xs bg-opacity-35 w-fit`}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text) => <>{formatDate(text)}</>,
    },
    ,
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text) => <>{formatDate(text)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <div className={`${statusColors[text.toLowerCase()]} font-medium`}>
          {text}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'task_id',
      render: (id) => {
        const task_id = bufferToHex(id.data);
        return (
          <Space size="middle">
            <Link
              to={`/edit-task/${task_id}`}
              className="flex items-center gap-1"
            >
              <EditOutlined />
              Edit
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                handleDelete(task_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="flex items-center gap-4 flex-col md:flex-row">
        <Search
          placeholder="input search text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <FilterSelect
          placeholder={'Filter By Priority'}
          setFilter={setPriorityFilter}
          options={[
            {
              label: 'Highest',
              value: 'HIGHEST',
            },
            {
              label: 'High',
              value: 'HIGH',
            },
            {
              label: 'Low',
              value: 'LOW',
            },
            {
              label: 'Medium',
              value: 'MEDIUM',
            },
          ]}
        />
        <FilterSelect
          placeholder={'Filter By Status'}
          setFilter={setStatusFilter}
          options={[
            {
              label: 'Open',
              value: 'OPEN',
            },
            {
              label: 'In Progress',
              value: 'IN PROGRESS',
            },
            {
              label: 'Completed',
              value: 'COMPLETED',
            },
          ]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={todos}
        className="md:overflow-hidden overflow-x-scroll"
      />
    </>
  );
};
export default TodoList;
