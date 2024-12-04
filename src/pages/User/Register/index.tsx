import { Footer } from '@/components';
import { register } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import {Helmet, history, Link} from '@umijs/max';
import { parse } from 'query-string';
import {Tabs, message, Divider} from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

import { SYSTEM_LOGO, WEBSITE_LINK } from '@/constants';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Lang = () => {
  return;
};
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();

  // form submitting
  const handleSubmit = async (values: API.RegisterParams) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {userAccount, userPassword, checkPassword, verifyCode } = values;
    if (userPassword !== checkPassword) {
      message.error("两次输入的密码不一致");
      return;
    }
    try {
      //注册
      const id = await register({userAccount, userPassword, checkPassword, verifyCode });
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /*
        Redirecting to login page
         */
        if (!history) return;
        const query = parse(history.location.search);
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);  // alert a error message
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={{  // search by resources, and located to the file
            searchConfig: {  // node_modules/@ant-design/pro-form/es/layouts/LoginForm/index.js
              submitText: '注册',
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="User Management System"
          subTitle={
            <a href={WEBSITE_LINK} target="_blank" rel="noreferrer">
              {' '}
              rTwTroy{' '}
            </a>
          }

          onFinish={async (values) => {  // call the body while click the button
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    min: 4,
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    min: 8,
                  },
                ]}
              />
              {/*Check password required*/}
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    min: 8,
                  },
                ]}
              />
              <ProFormText
                name="verifyCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入邀请码'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Divider type="vertical" />
            <Link to="/user/login">用户登录</Link>
            <Divider type="vertical" />
            <a
              style={{
                float: 'right',
              }}
              href={WEBSITE_LINK}
              target="_blank"
              rel="noreferrer"
            >
              找回账号
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
