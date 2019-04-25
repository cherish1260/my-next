import axios from 'axios';
import qs from 'qs';

const Interceptor = {
  request: [(request) => {
    const { method } = request;
    let params = {};
    if (method === 'get') {
      params = request.params || request.data || {};
    } else if (method === 'post') {
      params = request.data || {};
    }
    const reqParams = {
    };

    Object.keys(params).forEach((key) => {
      if (key === 'undefined' || params[key] === undefined || params[key] === '') return;
      reqParams[key] = params[key];
    });
    request.params = reqParams;
    delete request.data;
    return request;
  }],
  response: [(response) => {
    if (/json/.test(response.headers['content-type'])) {
      const { retcode, retCode, retdesc, retDesc, ...data } = response.data;
      // 兼容处理
      const code = Number(retcode || retCode);
      const msg = retdesc || retDesc;
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(code) || code === 200) {
        return data.data; // 业务数据
      }
      return Promise.reject({ code, msg });
    }
    return response; // response对象
  }, (err) => {
    let msg = (err && err.response && err.response.data && err.response.data.msg) || '出现点小问题，请重试！';
    let code = (err && err.response && err.response.data && err.response.data.status)
      || (err && err.response && err.response.status) || 0;
    code = Number(code);
    switch (code) {
      case 408:
        msg = '请求超时，请稍后重试';
        break;
      case 502:
      case 504:
        msg = '网络不给力，请稍后重试';
        break;
      default:
        msg = '系统开了个小差，请稍后重试';
    }
    return Promise.reject({ code, msg });
  }],
};

class Fetch {
  constructor(config) {
    const fetch: any = this.create(config); // 系统默认实例
    fetch.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    return fetch;
  }

  create(config) {
    const instance = axios.create(Object.assign({
      baseURL: '/',
      timeout: 10 * 1000,
      transformRequest: [function (data: any) {
        return qs.stringify(data);
      }],
    }, config));
    instance.interceptors.request.use(...Interceptor.request);
    instance.interceptors.response.use(...Interceptor.response);
    return instance;
  }
}

export default new Fetch();
