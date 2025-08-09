import { instance } from "@/utils/axios";

// 注册接口
export const register = (data: InterLogin) => {
  return instance({
    url: "register",
    method: "POST",
    data,
  });
};

// 登录接口
export const login = (data: InterLogin) => {
  return instance({
    url: "login",
    method: "POST",
    data,
  });
};

// 验证邮箱接口
export const emailInquiry = (data: { account: string; email: string }) => {
  return instance({
    url: "user/emailInquiry",
    method: "POST",
    data,
  });
};

// 登录界面修改密码接口
export const forgetPasswordInLogin = (data: {
  id: number;
  password: string;
}) => {
  return instance({
    url: "user/forgetPasswordInLogin",
    method: "POST",
    data,
  });
};

// 获取用户信息接口
export const getUserInfo = (data: { id: number }) => {
  return instance({
    url: "user/getUserInfo",
    method: "POST",
    data,
  });
};

//修改账号接口
export const changeAccount = (data: { account: string; id: number }) => {
  return instance({
    url: "user/changeAccount",
    method: "POST",
    data,
  });
};

// 修改密码接口
export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
  id: number;
}) => {
  return instance({
    url: "user/changePassword",
    method: "POST",
    data,
  });
};

// 修改姓名接口
export const changeName = (data: { name: string; id: number }) => {
  return instance({
    url: "user/changeName",
    method: "POST",
    data,
  });
};

// 修改性别接口
export const changeSex = (data: { sex: string; id: number }) => {
  return instance({
    url: "user/changeSex",
    method: "POST",
    data,
  });
};

// 修改邮箱接口
export const changeEmail = (data: { email: string; id: number }) => {
  return instance({
    url: "user/changeEmail",
    method: "POST",
    data,
  });
};

// 头像绑定账号接口
export const bandAccount = (data: {
  account: string;
  image_url: string;
  onlyId: string;
}) => {
  return instance({
    url: "user/bandAccount",
    method: "POST",
    data,
  });
};

// 创建管理员
export const createAdmin = (data: {
  account: string;
  password: string;
  name: string;
  department: string;
  email: string;
  sex: string;
  identity: string;
}) => {
  return instance({
    url: "user/createAdmin",
    method: "POST",
    data,
  });
};

// 获取管理员接口
export const getAdminList = (data: { identity: string }) => {
  return instance({
    url: "user/getAdminList",
    method: "POST",
    data,
  });
};

// 编辑管理员账号信息
export const editAdmin = (data: {
  id: number;
  account: string;
  name: string;
  department: string;
  email: string;
  sex: string;
}) => {
  return instance({
    url: "user/editAdmin",
    method: "POST",
    data,
  });
};

// 对管理员降职或提权
export const changeAdmin = (data: { id: number; identity: string }) => {
  return instance({
    url: "user/changeAdmin",
    method: "POST",
    data,
  });
};

// 冻结或解冻用户
export const changeUser = (data: { id: number; status: string }) => {
  return instance({
    url: "user/changeUser",
    method: "POST",
    data,
  });
};

// 获取冻结用户列表
export const getBanUsersList = () => {
  return instance({
    url: "user/getBanUsersList",
    method: "POST",
  });
};

// 获取所有用户
export const getAllUser = () => {
  return instance({
    url: "user/getAllUser",
    method: "POST",
  });
};

//通过账号搜索用户
export const searchUser = (data: { account: string; identity?: string }) => {
  return instance({
    url: "user/searchUser",
    method: "POST",
    data,
  });
};

// 通过部门搜索用户
export const filterDepartment = (data: { department: string }) => {
  return instance({
    url: "user/filterDepartment",
    method: "POST",
    data,
  });
};
// 删除用户
export const deleteUser = (data: { id: number }) => {
  return instance({
    url: "user/deleteUser",
    method: "POST",
    data,
  });
};
