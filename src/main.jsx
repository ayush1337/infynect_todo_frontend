import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CreateTask from './components/CreateTask.jsx';
import Navbar from './components/Navbar.jsx';
import EditTask from './components/EditTask.jsx';
import Todo from './components/Todo.jsx';
import UploadCSV from './components/UploadCSV.jsx';
import Footer from './components/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/add-task" element={<CreateTask />}></Route>
        <Route path="/edit-task/:taskID" element={<EditTask />}></Route>
        <Route path="/todo/:taskID" element={<Todo />}></Route>
        <Route path="/upload-csv" element={<UploadCSV />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
