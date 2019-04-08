import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.weixin.qq.com/cgi-bin",
  timeout: 10 * 1000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 添加一个请求拦截器
axios.interceptors.request.use(function (request) {
  // Do something before request is sent
  const { params = {} } = request;
  const reqParams = {};
  Object.keys(params).forEach((key) => {
    if (key === 'undefined' || params[key] === undefined || params[key] === '') return;
    reqParams[key] = params[key];
  });
  request.params = reqParams;
  return request;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  let res = response;
  console.log('res', response);
  // Do something with response data
  const { retcode, retCode, resultCode, retdesc, retDesc, resultDesc, ...data } = response.data;
  // 兼容各项目组的风格
  const code = String(retcode || retCode || resultCode);
  const desc = String(retdesc || retDesc || resultDesc);
  if (code === '200') {
    // do nothing
  } else {
    return Promise.reject({
      // 业务异常
      // type: 'biz',
      msg: desc,
      code,
      data,
    });
  }
  // 正常，则直接返回数据对象
  res = data.data || data.dataList;
  return res;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default instance;