import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef } from 'react';
import { deleteNote, searchNotes } from '@/services/ant-design-pro/api';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.NoteParams>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    copyable: true,
    search: true,
  },
  {
    title: 'Content',
    dataIndex: 'content',
    search: false,
  },
  {
    title: 'Created Time',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    search: false,
  },
  {
    title: 'userId',
    dataIndex: 'userId',
    valueType: 'text',
    search: true,
  },
  {
    title: 'Action', // 操作列
    dataIndex: 'action',
    search: false,
    render: (_, record) => (
      <Popconfirm
        title="Are you sure to delete this user?"
        onConfirm={async () => {
          const deleteResult = await deleteNote(record);
          return {
            data: deleteResult,
          };
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button type="link" danger>
          删除
        </Button>
      </Popconfirm>
    ),
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.NoteParams>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        const noteList = await searchNotes(params);
        return {
          data: noteList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"></ProTable>
  );
}
