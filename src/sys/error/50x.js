import React, { Component } from 'react';
import style from './style.less';

export default class Page50x extends Component {
  render() {
    return (
      <div className={style.errorMsg}>
        <div className={style.title}>抱歉，服务器开小差了</div>
      </div>
    );
  }
}
