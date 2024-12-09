// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {  // not {data}
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<Record<string, any>>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    // post route, no related about proxy or request so
    method: 'POST', // please start with `/api/`, tips: don't add `/` in the end
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {  // `RegisterResult`: the return type
    // post route, no related about proxy or request so
    method: 'POST', // please start with `/api/`, tips: don't add `/` in the end
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 POST /api/user/find */
export async function findUsers(body: API.SearchParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/find', {
    method: 'POST',
    // POST to search by conditions
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function deleteUser(body: API.DeleteParams, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 添加笔记 POST /api/note/add */
export async function addNote(body: API.NoteParams, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.NoteParams>>('/api/note/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除笔记 POST /api/note/delete */
export async function deleteNote(body: API.NoteParams, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.NoteParams>>('/api/note/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 搜索笔记 POST /api/note/search */
export async function searchNotes(body: API.NoteParams, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.NoteParams>>('/api/note/search', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 搜索笔记 POST /api/note/mynote */
export async function myNotes(userId: string, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.NoteParams>>('/api/note/mynote', {
    method: 'POST',
    data: { userId },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
