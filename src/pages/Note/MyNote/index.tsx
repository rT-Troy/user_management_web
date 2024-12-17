import { ActionType, ModalForm, ProColumns, ProFormText } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Modal, Form, Input, message } from 'antd';
import { useRef, useState } from 'react';
import { addNote, currentUser, deleteNote, myNotes, updateNote } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';

const NoteTable: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 控制状态
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.NoteParams | null>(null);

  // 表单实例
  const [form] = Form.useForm();

  // 点击修改按钮，打开 Modal 并设置当前记录数据
  const handleEdit = (record: API.NoteParams) => {
    setCurrentRecord(record);
    form.setFieldsValue(record); // 回显表单数据
    setEditModalVisible(true);
  };

  // 提交修改后的数据
  const handleSubmit = async () => {
    try {
      const updatedValues = await form.validateFields();
      await updateNote({ ...currentRecord, ...updatedValues }); // 提交更新数据
      message.success('修改成功');
      setEditModalVisible(false); // 关闭 Modal
      actionRef.current?.reload(); // 刷新表格数据
    } catch (error) {
      message.error('修改失败，请重试');
    }
  };

  // 添加笔记
  const handleAddNote = async (values: API.NoteParams) => {
    const { title, content } = values;
    const user = await currentUser();
    const userId: string = user?.id?.toString() || null;
    try {
      const result = await addNote({ title, content, userId });
      if (result) {
        message.success('添加成功！');
        setCreateModalVisible(false);
        actionRef.current?.reload(); // 刷新表格
        return true;
      }
    } catch (error) {
      message.error('添加失败，请重试！');
      return false;
    }
  };

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
      title: 'Action', // 操作列
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          {/* 修改按钮 */}
          <Button type="link" onClick={() => handleEdit(record)}>
            修改
          </Button>
          {/* 删除按钮 */}
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
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.NoteParams>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const user = await currentUser();
          const userId: string = user?.id?.toString() || null;
          const title: string = params.title || '';
          const noteList = await myNotes(title, userId);
          return { data: noteList };
        }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="笔记管理表格"
        toolBarRender={() => [
          <Button
            type="primary"
            key="new"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />

      {/* Modal 弹窗表单 */}
      <ModalForm<API.NoteParams>
        title="Create Note"
        visible={createModalVisible}
        onVisibleChange={setCreateModalVisible}
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
      <Modal
        title="编辑笔记"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleSubmit}
        okText="提交"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ min: 4, message: '标题不能为空' }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ min: 8, message: '内容不能为空' }]}
          >
            <Input.TextArea rows={5} placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NoteTable;
