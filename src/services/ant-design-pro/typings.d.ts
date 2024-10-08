// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: string;  // all of these should be string expect date
    username?: string;
    userAccount?: string;
    userPassword?: string;
    avatarUrl?: string;
    gender?: string;
    phone?: string;
    email?: string;
    userStatus?: string;
    createTime?: Date;
    update?: string;
    isDelete?: string;
    userRole?: number;
    verifyCode?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number; // just the id

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    id?: string;  // all of these should be string expect date
    username?: string;
    userAccount?: string;
    userPassword?: string;
    avatarUrl?: string;
    gender?: string;
    phone?: string;
    email?: string;
    userStatus?: string;
    createTime?: Date;
    update?: string;
    isDelete?: string;
    userRole?: number;
    key?: number;
    // disabled?: boolean;
    // href?: string;
    // avatar?: string;
    // name?: string;
    // owner?: string;
    desc?: string;
    callNo?: number;
    // status?: number;
    // updatedAt?: string;
    // createdAt?: string;
    // progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;  // `?`: here means the param userAccount is optional
    userPassword?: string;  // all `?` could be removed here
    checkPassword?: string;
    verifyCode?: string;
    type?: string;
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
