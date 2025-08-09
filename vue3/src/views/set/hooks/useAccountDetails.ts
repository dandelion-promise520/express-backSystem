import {  reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import { useUserInfo } from "@/store/userInfo";
import { emailReg } from "@/utils/limit";
import {
  bandAccount,
  changeAccount,
  changeName,
  changeSex,
  changeEmail,
} from "@/api/userInfo";
import router from "@/router";

// 数据
const {
  account,
  name,
  sex,
  email,
  department,
  identity,
  image_url,
  GetUserInfo,
} = useUserInfo();


// 账号
export const accountDetailData = reactive({
  account,
  name,
  sex,
  identity,
  department,
  email,
  image_url,
  GetUserInfo,
});

// 方法
// 每隔3秒判断是否有账号id，如果无，则提示用户登录过期
let id: number;
const interval = setInterval(() => {
  if (localStorage.getItem("id")) {
    id = +localStorage.getItem("id")!;
  } else {
    ElMessage.error("登录过期，请重新登录");
    router.push("/login");
    clearInterval(interval);
  }
}, 3000);

export const accountFlag = ref(false);
// 判断是否是原账号一致，如果一致则禁用按钮
watch(
  () => accountDetailData.account,
  (newValue) => {
    if (newValue === account) {
      accountFlag.value = false;
    } else {
      accountFlag.value = true;
    }
  }
);

// 监听是否可以修改姓名
export const nameFlag = ref(false);
// 判断是否是原姓名一致，如果一致则禁用按钮
watch(
  () => accountDetailData.name,
  (newValue) => {
    if (newValue === name) {
      nameFlag.value = false;
    } else {
      nameFlag.value = true;
    }
  }
);

// 监听是否可以修改性别
export const sexFlag = ref(false);
// 判断是否是原性别一致，如果一致则禁用按钮
watch(
  () => accountDetailData.sex,
  (newValue) => {
    if (newValue === sex) {
      sexFlag.value = false;
    } else {
      sexFlag.value = true;
    }
  }
);

// 监听是否可以修改邮箱
export const emailFlag = ref(false);
// 判断是否是原邮箱一致，如果一致则禁用按钮
watch(
  () => accountDetailData.email,
  (newValue) => {
    if (newValue === email) {
      emailFlag.value = false;
    } else {
      emailFlag.value = true;
    }
  }
);

// 对图片的格式进行判断,头像上传之前的函数
export const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片必须是jpg格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小必须小于2MB!");
    return false;
  }
  return true;
};

// 头像上传成功的函数
export const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  // console.log(uploadFile);

  // console.log(response);
  if (response.status !== 0) {
    ElMessage.error("图片上传失败，请重新上传");
    return;
  }
  (async () => {
    const res = await bandAccount({
      account,
      image_url: response.image_url,
      onlyId: response.onlyId,
    });
    if (res.data.status !== 0) {
      ElMessage.error("头像绑定账号失败");
      return;
    }
    const imageUrl = import.meta.env.VITE_API_BASE_URL + response.image_url;
    useUserInfo().$patch((item) => (item.image_url = imageUrl));
    ElMessage({
      message: "更新头像成功",
      type: "success",
    });
    accountDetailData.image_url = imageUrl;
  })();
};

// 更新账号
export const ChangeAccount = async () => {
  // 前端账号长度验证
  if (
    accountDetailData.account.length < 4 ||
    accountDetailData.account.length > 12
  ) {
    ElMessage.error("您的账号必须在4位与12位之间");
    return;
  }

  const res = await changeAccount({ account: accountDetailData.account, id });
  if (res.data.status !== 0) {
    if (res.data.status === 1) {
      ElMessage.error(res.data.message);
      return;
    }
    ElMessage.error("账号更新失败");
    return;
  } else {
    useUserInfo().$patch((item) => (item.account = accountDetailData.account));
    ElMessage({
      message: "修改账号名成功",
      type: "success",
    });
  }
};

// 更新姓名
export const ChangeName = async () => {
  // const reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
  // if (reg.test(accountDetailData.name)) {
  //   ElMessage.error("您的名字不符合规范,请输入正确的姓名");
  //   return;
  // }
  const res = await changeName({
    name: accountDetailData.name,
    id,
  });
  if (res.data.status !== 0) {
    ElMessage.error("修改姓名失败");
    return;
  } else {
    useUserInfo().$patch((item) => (item.name = accountDetailData.name));
    ElMessage({
      message: "修改姓名成功",
      type: "success",
    });
  }
};
// 更新性别
export const ChangeSex = async () => {
  const res = await changeSex({
    sex: accountDetailData.sex,
    id,
  });
  if (res.data.status !== 0) {
    ElMessage.error("修改性别失败");
    return;
  } else {
    useUserInfo().$patch((item) => (item.sex = accountDetailData.sex));
    ElMessage({
      message: "修改性别成功",
      type: "success",
    });
  }
};
// 更新邮箱
export const ChangeEmail = async () => {
  // 给邮箱上正则
  if (!emailReg.test(accountDetailData.email)) {
    ElMessage.error("您的邮箱不符合格式");
    return;
  }
  try {
    const res = await changeEmail({
      email: accountDetailData.email,
      id,
    });
    useUserInfo().$patch((item) => (item.email = accountDetailData.email));
    ElMessage({
      message: res.data.message,
      type: "success",
    });
  } catch (error: any) {
    ElMessage.error(error.response);
  }
};
