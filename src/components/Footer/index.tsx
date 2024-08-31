import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/rT-Troy',
          blankTarget: true,
        },
        {
          key: 'rT-Troy',
          title: 'rT-Troy',
          href: 'https://www.yotroy.cool',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
