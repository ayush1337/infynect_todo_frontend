import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const UploadCSV = () => {
  const [csvData, setCsvData] = useState('');
  const { getItem } = useLocalStorage('user');
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!getItem()) {
      navigate('/');
    }
  });
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setCsvData(contents);
    };

    reader.readAsText(file);
  };

  const convertCSVToArray = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = values[j].trim();
      }
      data.push(obj);
    }

    return data;
  };

  const uploadCSV = async () => {
    try {
      const dataArray = convertCSVToArray(csvData);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/task/bulk_add`,
        {
          dataArray,
        },
        {
          headers: {
            'access-token': getItem(),
          },
        }
      );
      if (response.status == 201) {
        messageApi.open({
          type: 'success',
          content: 'CSV file uploaded',
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
    <div className="flex flex-col gap-2">
      {contextHolder}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="self-center"
      />
      <Button onClick={uploadCSV}>
        Upload CSV <UploadOutlined />
      </Button>
      <h1 className="self-center">Upload CSV Files.</h1>
    </div>
  );
};

export default UploadCSV;
