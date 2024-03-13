import Logout from './Logout';
import LOGO from '../assets/todos_logo.png';
import { Link } from 'react-router-dom';
import CreateTaskBtn from './CreateTaskBtn';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import downloadCSV from '../utils/downloadCSV';
import UploadCSV from './UploadCSV';
const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { getItem } = useLocalStorage('user');

  useEffect(() => {
    if (getItem()) {
      setShowNav(() => true);
    } else {
      setShowNav(() => false);
    }
  }, []);

  if (!showNav) {
    return <></>;
  } else {
    return (
      <nav className="w-full flex items-center gap-2 flex-col md:flex-row pb-4">
        <Link to="/" className="w-36">
          <img src={LOGO} alt="logo" className="w-full" />
        </Link>
        <CreateTaskBtn />
        <Button onClick={() => downloadCSV(getItem())}>
          Download CSV <DownloadOutlined />
        </Button>

        <Link to="/upload-csv">
          <Button>
            Upload CSV <UploadOutlined />
          </Button>
        </Link>

        <Logout />
      </nav>
    );
  }
};

export default Navbar;
