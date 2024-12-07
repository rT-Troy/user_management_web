import { ActionType, ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

import { TreeSelect, message } from 'antd';
import moment from 'dayjs';
import { useRef } from 'react';
import { FormOutlined, LinkOutlined } from '@ant-design/icons';
import { searchNotes } from '@/services/ant-design-pro/api';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProForm<API.NoteParams>
      actionRef={actionRef}
      request={async (params,sort,filter) => {
        const noteList = await searchNotes(params);
        return {
          data: noteList,
        };
      }}
    >
      <ProFormText
        size="large"
        name="title"
        label="Title"
        required
        rules={[{ required: true, message: '这是必填项' }]}
      />
      <ProFormTextArea size="large" name="content" label="Content" />
    </ProForm>
  );
};
