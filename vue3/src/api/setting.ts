import { instance } from "@/utils/axios";

//获取轮播图接口
export const getAllSwiper = () => {
  return instance({
    url: "setting/getAllSwiper",
    method: "POST",
  });
};

// 获取公司信息接口
export const getAllCompanyIntroduce = () => {
  return instance({
    url: "setting/getAllCompanyIntroduce",
    method: "POST",
  });
};

// 修改公司名称接口
export const changeCompanyName = (set_value: string) => {
  return instance({
    url: "setting/changeCompanyName",
    method: "POST",
    data: {
      set_value,
    },
  });
};

// 编辑公司介绍接口
export const changeCompanyIntroduce = (set_text: string, id: number) => {
  return instance({
    url: "setting/changeCompanyIntroduce",
    method: "POST",
    data: {
      set_text,
      id,
    },
  });
};

// 上传轮播图接口
export const uploadSwiper = (set_name: string) => {
  return instance({
    url: "setting/changeCompanyName",
    method: "POST",
    data: {
      set_name,
    },
  });
};
