// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number;  // all of these should be string expect date
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

  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  }

  type RegisterResult = number; // just the id

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type NoteParams = {
    id?: string;
    title?: string;
    content?: string;
    createTime?: Date;
    userId?: string;
    isDelete?: string;
  }

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
    desc?: string;
    callNo?: number;
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

  type SearchParams = {
    username?: string;
    userAccount?: string;
    gender?: string;
  }

  type DeleteParams = {
    id?: number;
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
