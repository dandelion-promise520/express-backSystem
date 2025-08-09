import { reactive } from "vue";
import { emailReg, passwordReg } from "@/utils/limit";

// 编辑管理员表单验证规则
export const rules = reactive({
  name: [{ required: true, message: "您的姓名不能为空", trigger: "blur" }],
  sex: [{ required: true, message: "您的性别不能为空", trigger: "blur" }],
  department: [
    { required: true, message: "您的部门不能为空", trigger: "blur" },
  ],
  email: [
    { required: true, message: "您的邮箱不能为空", trigger: "blur" },
    { validator: emailReg, message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
});

// 添加管理员表单验证规则
export const rulesAdd = reactive({
  account: [{ required: true, message: "您的账号不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "您的密码不能为空", trigger: "blur" },
    {
      validator: passwordReg,
      message:
        "您的密码至少有一个小写字母、一个大写字母、一个数字和一个特殊字符,且长度为8~16位",
      trigger: "blur",
    },
  ],
  name: [{ required: true, message: "您的姓名不能为空", trigger: "blur" }],
  department: [
    { required: true, message: "您的部门不能为空", trigger: "blur" },
  ],
  email: [
    { required: true, message: "您的邮箱不能为空", trigger: "blur" },
    { validator: emailReg, message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  sex: [{ required: true, message: "您的性别不能为空", trigger: "blur" }],
});
