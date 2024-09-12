import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { searchUsers } from '@/services/ant-design-pro/api';
import { Image } from 'antd';
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
  },
  {
    title: 'username',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: 'account',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: 'avatar',
    dataIndex: 'avatarUrl',
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
  },
  {
    title: 'email',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    copyable: true,
  },
  {
    title: 'Role',
    dataIndex: 'userRole',
    valueType: 'select', // `select` make options
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
  },
  {
    title: 'status',
    dataIndex: 'userStatus',
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
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
};
