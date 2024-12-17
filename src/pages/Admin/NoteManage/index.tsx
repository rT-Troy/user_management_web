import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { useRef } from 'react';
import { deleteNote, searchNotes } from '@/services/ant-design-pro/api';

const NoteTable: React.FC = () => {
  const actionRef = useRef<ActionType>();


  // 定义表格列
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
      valueType: 'textarea', // 多行文本框展示
      search: false,
      fieldProps: {
        rows: 3,
      },
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
          title="Are you sure to delete this note?"
          onConfirm={async () => {
            await deleteNote(record);
            message.success('删除成功');
            actionRef.current?.reload();
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

  return (
    <>
      <ProTable<API.NoteParams>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const noteList = await searchNotes(params);
          return { data: noteList };
        }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="笔记管理表格"
      />
    </>
  );
};

export default NoteTable;
