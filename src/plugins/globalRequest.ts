import {extend} from 'umi-request';
import { history } from '@umijs/max';
import { stringify } from 'querystring';
import { message } from 'antd';

/**
 * 全局请求拦截器
 * Encapsulate the request method of umi
 */

const request = extend({
  credentials: 'include',
})

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
      },
    },
  }
});

request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 0) {
    return res.data;
  }
  if (res.code === 40100) { // user not login
    message.error('Please login first');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      })
    })
  } else {
    message.error(res.description);
  }
  return res.data;
});

export default request;
