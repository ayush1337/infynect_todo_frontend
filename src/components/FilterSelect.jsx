import React from 'react';
import { Select, Tag } from 'antd';

const tagRender = (props) => {
  const { label, value, closable, onClose, color } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
const FilterSelect = ({ placeholder, options, setFilter }) => {
  const handleChange = (values) => {
    setFilter(() => values);
  };
  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      placeholder={placeholder}
      style={{
        width: '100%',
      }}
      options={options}
      onChange={handleChange}
    />
  );
};
export default FilterSelect;
