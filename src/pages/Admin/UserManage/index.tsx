import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { deleteUser, findUsers } from '@/services/ant-design-pro/api';
import { Button, Image, Popconfirm } from 'antd';
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
const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',  // should match the column name
    valueType: 'indexBorder',
    width: 48,
    search: false,  // not allowed to search by this
  },
  {
    title: 'username',
    dataIndex: 'username',
    copyable: true,
    search: true,
  },
  {
    title: 'account',
    dataIndex: 'userAccount',
    copyable: true,
    search: true,
  },
  {
    title: 'avatar',
    dataIndex: 'avatarUrl',
    search: false,
    /*
    render the avatar
     */
    render: (_, record) => (  // `_`: unit, `record`: a row
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>
    ),
    copyable: true,
  },
  {
    title: 'gender',
    dataIndex: 'gender',
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    copyable: true,
    search: false,
  },
  {
    title: 'email',
    dataIndex: 'email',
    copyable: true,
    search: false,
  },
  {
    title: 'role',
    dataIndex: 'userRole',
    valueType: 'select', // `select` make options
    search: false,
    valueEnum: {
      0: { // `0`: match the role value
        text: 'user',
        status: 'Default',  // this will express by different
                            // colors in front of the text
      },
      1: {
        text: 'admin',
        status: 'Success',
      }
    }
  },
  {
    title: 'verifyCode',
    dataIndex: 'verifyCode',
    copyable: true,
    search: false,
  },
  {
    title: 'Action', // 操作列
    dataIndex: 'action',
    search: false,
    render: (_, record) => (
      <Popconfirm
        title="Are you sure to delete this user?"
        onConfirm={async () => {
          const deleteResult = await deleteUser(record);
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
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // params：the data which transfer to the backend
      request={async (params, sort, filter) => {
        const userList = await findUsers(params);
        return {
          data: userList,
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
          if (type === 'get') {  // 'get': here to ensuring 'reset' button works.
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
};
