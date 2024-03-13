import { useEffect, useState, useCallback } from 'react';
import TodoList from './TodoList';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { getItem } = useLocalStorage('user');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const token = getItem();
  const location = useLocation();

  const fetchAllTodos = useCallback(async () => {
    try {
      setStatus((p) => ({ ...p, loading: true }));

      const responeTodos = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/task/${location.search}`,
        {
          headers: {
            'access-token': token,
          },
        }
      );

      const todoNew = responeTodos.data.map((todo, indx) => ({
        ...todo,
        key: indx + 1,
        s_no: indx + 1,
      }));

      setTodos(todoNew);
      setStatus((p) => ({ ...p, loading: false, success: true }));
    } catch (error) {
      setStatus((p) => ({ ...p, loading: false, error: true }));
    }
  }, [location.search, token, setTodos, setStatus]);

  useEffect(() => {
    fetchAllTodos();
  }, [location.search]);

  return (
    <main className="w-full flex flex-col gap-4">
      {status.success === true && (
        <TodoList todos={todos} fetchAllTodos={fetchAllTodos} />
      )}
    </main>
  );
};

export default Home;
