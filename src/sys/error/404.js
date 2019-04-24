import React, { Component } from 'react';
import style from './style.less';

export default class Page404 extends Component {
  render() {
    return (
      <div className={style.errorMsg}>
        <div className={style.title}>访问的页面不存在</div>
      </div>
    );
  }
}
