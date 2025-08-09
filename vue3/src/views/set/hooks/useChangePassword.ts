import { reactive } from "vue";
import { changePassword } from "@/api/userInfo";
import { ElMessage } from "element-plus";
import router from "@/router";
import { passwordReg } from "@/utils/limit";

// 数据
// 弹框状态
export const statu = reactive({
  changePasswordDialog: false,
});

// 必填项
export const rules = reactive({
  oldPassword: [
    { required: true, message: "您的旧密码不能为空", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "您的新密码不能为空", trigger: "blur" },
    {
      validator: passwordReg,
      message:
        "您的密码至少有一个小写字母、一个大写字母、一个数字和一个特殊字符,且长度为8~16位",
      trigger: "blur",
    },
  ],
  rePassword: [
    { required: true, message: "您的确认密码不能为空", trigger: "blur" },
  ],
});

// 忘记密码
export const changePasswordForm: InterchangePassword = reactive({
  oldPassword: "",
  newPassword: "",
  rePassword: "",
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

// 调用登录页面修改密码接口
export const ChangePassword = async () => {
  // console.log(typeof id, id);
  if (
    !changePasswordForm.oldPassword ||
    !changePasswordForm.newPassword ||
    !changePasswordForm.rePassword
  ) {
    ElMessage.error("您的密码不能为空");
    return;
  }
  if (changePasswordForm.newPassword !== changePasswordForm.rePassword) {
    ElMessage.error("您两次输入的密码不一致，请检查");
    return;
  }
  // 为密码添加正则
  if (!passwordReg.test(changePasswordForm.newPassword)) {
    ElMessage.error(
      "您的密码至少有一个小写字母、一个大写字母、一个数字和一个特殊字符,且长度为8~16位"
    );
    return;
  }
  try {
    const res = await changePassword({
      oldPassword: changePasswordForm.oldPassword,
      newPassword: changePasswordForm.newPassword,
      id,
    });
    if (res.data.status !== 0) {
      ElMessage.error(res.data.message);
      return;
    }
    ElMessage({
      message: res.data.message,
      type: "success",
    });
    statu.changePasswordDialog = false;
    setTimeout(() => {
      ElMessage({
        message: "抱歉，您的登录过期，请重新登录",
        type: "warning",
      });
      router.push("login");
      localStorage.clear();
    }, 1500);
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};
