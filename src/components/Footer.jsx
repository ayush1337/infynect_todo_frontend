import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-2 items-center pt-5 text-sm md:text-base">
      <Link
        to="https://drive.google.com/file/d/1TsyHRLPl7TvTEl8sbJYZFU26WYLMlxgr/view?usp=drive_link"
        className="opacity-85 text-gray-500 hover:text-gray-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        ~by Ayush Kumar
      </Link>
      <Link
        to="mailto:ayushsingh.8d@gmail.com"
        className="opacity-85 text-gray-500 hover:text-gray-800"
      >
        ayushsingh.8d@gmail.com
      </Link>
      <Link
        to="https://drive.google.com/file/d/1TsyHRLPl7TvTEl8sbJYZFU26WYLMlxgr/view?usp=drive_link"
        className="opacity-85 text-gray-500 hover:text-gray-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        7004634977
      </Link>
    </footer>
  );
};

export default Footer;
