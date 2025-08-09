<template>
  <!-- 忘记密码弹框页面 -->
  <el-dialog
    v-model="status.forgetPasswordDialog"
    title="忘记密码"
    width="400px"
  >
    <el-form
      :model="forgetData"
      label-width="auto"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="forgetData.account"
          placeholder="请输入账号"
          clearable
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="forgetData.email"
          placeholder="请输入邮箱"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="status.forgetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="EmailInquiry"> 下一步 </el-button>
      </div>
    </template> 
  </el-dialog>
  <!-- 确认修改密码弹框页面 -->
  <el-dialog
    v-model="status.changePasswordDialog"
    title="修改密码"
    width="400px"
  >
    <el-form
      :model="forgetData"
      label-width="auto"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="forgetData.password"
          placeholder="请输入您想修改的密码"
          show-password
          type="password"
          clearable
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input
          v-model="forgetData.rePassword"
          placeholder="请再次输入您的密码"
          show-password
          type="password"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="status.changePasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="ForgetPasswordInLogin">
          确认修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="Forget_password">
import { reactive } from "vue";
import { emailInquiry, forgetPasswordInLogin } from "@/api/userInfo";
import { ElMessage } from "element-plus";
import { emailReg, passwordReg } from "@/utils/limit";

// 忘记密码
const forgetData: InterLogin = reactive({
  account: "",
  email: "",
  password: "",
  rePassword: "",
});
// 弹框状态
const status = reactive({
  forgetPasswordDialog: false,
  changePasswordDialog: false,
});
// 开启弹框按钮，传到index.vue
const openDialog = () => {
  status.forgetPasswordDialog = true;
};
defineExpose({ openDialog });

// 必填项
const rules = reactive({
  account: [{ required: true, message: "您的账号不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "您的邮箱不能为空", trigger: "blur" },
    { validator: emailReg, message: "您的邮箱格式不正确", trigger: "blur" },
  ],
  password: [
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

// 调用EmailInquiry接口 验证账号与邮箱是否对应
const EmailInquiry = async () => {
  if (!forgetData.account || !forgetData.email) {
    ElMessage.error("您的账号或密码不能为空");
    return;
  }
  // 为邮箱添加正则
  if (!emailReg.test(forgetData.email)) {
    ElMessage.error("您的邮箱格式不正确");
    return;
  }
  try {
    const res = await emailInquiry({
      account: forgetData.account,
      email: forgetData.email,
    });
    // console.log(res);
    if (res.data.status == 1) {
      ElMessage.error(res.data.message);
      return;
    }
    ElMessage({
      message: res.data.message,
      type: "success",
    });
    localStorage.setItem("id", res.data.id);
    status.forgetPasswordDialog = false;
    status.changePasswordDialog = true;
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};

// 调用登录页面修改密码接口
const ForgetPasswordInLogin = async () => {
  const id = +localStorage.getItem("id")!;
  if (forgetData.password !== forgetData.rePassword) {
    ElMessage.error("您两次输入的密码不一致，请检查");
    return;
  }
  // 为密码添加正则
  if (!passwordReg.test(forgetData.password)) {
    ElMessage.error(
      "您的密码至少有一个小写字母、一个大写字母、一个数字和一个特殊字符,且长度为8~16位"
    );
    return;
  }
  try {
    const res = await forgetPasswordInLogin({
      id,
      password: forgetData.password,
    });
    if (res.data.status == 1) {
      ElMessage.error(res.data.message);
      return;
    }
    ElMessage({
      message: res.data.message,
      type: "success",
    });
    status.changePasswordDialog = false;
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
}
</style>
