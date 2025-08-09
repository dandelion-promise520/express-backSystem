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
