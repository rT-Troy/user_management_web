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
export async function myNotes(title: string, userId: string, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.NoteParams>>('/api/note/mynote', {
    method: 'POST',
    data: {title, userId},
    ...(options || {}),
  });
}

/** 搜索笔记 POST /api/note/mynote */
export async function updateNote(body: API.NoteParams, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.NoteParams>>('/api/note/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
