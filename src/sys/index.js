import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { Toast } from 'antd-mobile';
import logo from 'img/logo.svg'
import style from './index.less';
import Fetch from 'Fetch';

class App extends Component {
  componentDidMount() {
    document.title = '这里是要修改成的新标题';
  }

  onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
  }

  test() {
    // H5 plus事件处理  
    const md = new MobileDetect(window.navigator.userAgent);
    console.log(md);
    Toast.info(md.mobile());
  }
  render() {
    return (
      <div className={style.container}>
        <header className={style.header}>
          <img src={logo} className={style.logo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className={style.link}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <QRCode value="http://10.236.173.55:3000/" />
          <div
            className={style.btn}
            onClick={() => {
              this.test();
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                }
              } else {
                this.onBridgeReady();
              }
            }}
          >
            登录
            </div>
          <div className={`${style.text} f-wrap`}>skjgfdsfggfdgkkkkkkkkkkkkkkkkkkkkjhgjjjjjjjjjjjjjgdsfgdjgkjsgkgjkghldfg</div>
        </header>
      </div>
    );
  }
}

export default App;
