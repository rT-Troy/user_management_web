export default [
  {
    path: '/', redirect: '/welcome',
  },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' },
             { name: '注册', path: '/user/register', component: './User/Register' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
      { path: '/admin/user-manage', name: '用户管理', component: './Admin/UserManage' },
      { path: '/admin/note', name: '笔记管理',  component: './Admin/NoteManage',}
    ],
  },
  {
    path: '/note',
    name: '笔记',
    icon: 'highlight',
    routes: [
      { path: '/note/mynote', name:'我的笔记', component: './Note/MyNote' },
    ],
  },
];
