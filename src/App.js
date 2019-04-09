import React, { Component } from 'react';
import QRCode from 'qrcode.react';
// import wx from 'weixin-js-sdk';
import logo from './logo.svg';
import './App.css';
import Fetch from './Fetch';
let wx = require('weixin-js-sdk');

class App extends Component {

  componentDidMount() {
    document.title = '这里是要修改成的新标题';
  }

  makeCode() {
    Fetch.post("token?grant_type=client_credential&appid=wxd80184da41839344&secret=d6bf61d6e0285b60e29813d5eeb89f84").then((result) => {
      console.log(result);
      alert("获取access_token成功")
    }).catch((err) => {
      console.log(err);
    });
  }

  onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <QRCode value="http://10.236.173.55:3000/" />
          <button onClick={() => {
            // this.makeCode();
            // wx.hideMenuItems({
            //   menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"]
            // })
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
          }}>登录</button>
        </header>
      </div>
    );
  }
}

export default App;
