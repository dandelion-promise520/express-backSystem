// 注册这块
export interface registerFormInter {
  account: string;
  password: string;
  rePassword: string;
}

// 登录这块
export interface loginFormInter {
  account: string;
  password: string;
}

// 忘记密码这块
export interface forgetInter {
  account: string;
  email: string;
}
// 确认修改密码这块
export interface confirmInter {
  password: string;
  rePassword?: string;
}