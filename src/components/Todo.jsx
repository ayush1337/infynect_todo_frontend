import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SkeletonLoading from './SkeletonLoading';
import formatDate from '../utils/formateDate';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import bufferToHex from '../utils/bufferToHex';
import { priorityColors, statusColors } from '../utils/colors';

const Todo = () => {
  const { getItem } = useLocalStorage('user');
  const navigate = useNavigate();
  const { taskID } = useParams();
  const [todo, setTodo] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const fetchSingleTask = async () => {
    try {
      setStatus((p) => {
        return { ...p, loading: true };
      });
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/task/${taskID}`,
        {
          headers: {
            'access-token': getItem(),
          },
        }
      );
      setTodo(() => res.data);
      setStatus((p) => {
        return { ...p, loading: false, success: true };
      });
    } catch (error) {
      setStatus((p) => {
        return { ...p, loading: false, error: true };
      });
    }
  };

  useEffect(() => {
    if (!getItem()) {
      navigate('/');
    }
    fetchSingleTask();
  }, []);

  return (
    <>
      {status.loading === true && <SkeletonLoading />}
      {status.success === true && (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-5xl flex flex-col gap-5">
            {todo.task_name.charAt(0).toUpperCase() + todo.task_name.slice(1)}
          </h1>
          <p className="text-gray-600 font-medium flex items-center gap-2">
            <span className="opacity-35 text-xs">
              {formatDate(todo.start_date)}
            </span>
            {'-'}
            <span className="opacity-35 text-xs">
              {formatDate(todo.end_date)}
            </span>
            <Link to={`/edit-task/${bufferToHex(todo.task_id.data)}`}>
              <Button>
                <EditOutlined />
              </Button>
            </Link>
          </p>
          <p className="flex items-center gap-2">
            <span
              className={`${
                priorityColors[todo.priority.toLowerCase()]
              } px-2 py-1 rounded border border-solid border-opacity-55`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            <span
              className={`${statusColors[todo.status.toLowerCase()]} px-2 py-1`}
            >
              {todo.status}
            </span>
          </p>
          <p className="text-3xl">{todo.description}</p>
        </div>
      )}
    </>
  );
};

export default Todo;
