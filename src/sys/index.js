/* eslint-disable no-undef */
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { Toast } from 'antd-mobile';
import logo from 'img/logo.svg';
import Footer from 'footer';
import style from './index.less';

class App extends Component {
  componentDidMount() {
    document.title = '这里是要修改成的新标题';
  }

  onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
  }

  test() {
    // H5 mobile detect事件处理
    const md = new MobileDetect(window.navigator.userAgent);
    Toast.info(md.mobile());
  }

  render() {
    const { history } = this.props;
    return (
      <div className={style.container}>
        <header className={style.header}>
          <img src={logo} className={style.logo} alt="logo" />
          <QRCode value="http://10.236.173.55:3000/" />
          <div
            className={style.btn}
            onClick={() => {
              history.push('/stock');
            }}
          >
            登录
          </div>
          <div className={`${style.text} f-ellipsis2`}>skjgfdsfggfdgkkkkkkkkkkkkkkkkkkkkjhgjjjj妇科但是也有佛igofdjjjjjjjjjgdsfgdjgkjsgkgjkghldfg</div>
        </header>
        <Footer selectedTab="home" history={history} />
      </div>
    );
  }
}

export default App;
