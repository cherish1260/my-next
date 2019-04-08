import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import logo from './logo.svg';
import './App.css';
import Fetch from './Fetch';

class App extends Component {

  makeCode() {
    Fetch.post("token?grant_type=client_credential&appid=wxd80184da41839344&secret=d6bf61d6e0285b60e29813d5eeb89f84").then((result) => {
      console.log(result);
      alert("获取access_token成功")
    }).catch((err) => {
      console.log(err);
    });
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
            this.makeCode();
          }}>登录</button>
        </header>
      </div>
    );
  }
}

export default App;
