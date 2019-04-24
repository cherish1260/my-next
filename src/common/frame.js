// 页面框架
import React from 'react';
import './style/index.less';

const Frame = (props) => {
  const { children } = props;
  return (
    <div className="app">
      {children}
    </div>
  );
};

export default Frame;
