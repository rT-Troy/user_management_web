import React, { useRef, useState } from 'react';
import { ActionType, ModalForm, ProFormText, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { currentUser, deleteNote, myNotes, addNote } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';

const NoteManagement = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false);

  // 添加笔记
  const handleAddNote = async (values: API.NoteParams) => {
    const { title, content } = values;
    const user = await currentUser();
    const userId: string = user?.id?.toString() || null;
    try {
      const result = await addNote({ title, content, userId });
      if (result) {
        message.success('添加成功！');
        setModalVisible(false);
        actionRef.current?.reload(); // 刷新表格
        return true;
      }
    } catch (error) {
      message.error('添加失败，请重试！');
      return false;
    }
  };

  // 删除笔记
  const handleDeleteNote = async (record: API.NoteParams) => {
    try {
      const deleteResult = await deleteNote(record);
      if (deleteResult) {
        message.success('删除成功！');
        actionRef.current?.reload(); // 刷新表格
        return;
      }
    } catch (error) {
      message.error('删除失败，请重试！');
    }
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
      title: 'Action',
      dataIndex: 'action',
      search : false,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this note?"
          onConfirm={() => handleDeleteNote(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
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
        request={async () => {
          const user = await currentUser();
          const userId: string = user?.id?.toString() || null;
          const noteList = await myNotes(userId);
          return {
            data: noteList,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-note-management',
          persistenceType: 'localStorage',
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
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="笔记管理"
        toolBarRender={() => [
          <Button
            type="primary"
            key="new"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />

      <ModalForm<API.NoteParams>
        title="Create Note"
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        onFinish={handleAddNote}
      >
        <ProFormText
          name="title"
          label="Title"
          rules={[{ min: 4, message: '长度不能小于4' }]}
        />
        <ProFormText
          name="content"
          label="Content"
          rules={[{ min: 8, message: '长度不能小于8' }]}
        />
      </ModalForm>
    </>
  );
};

export default NoteManagement;
