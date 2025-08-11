<template>
  <!-- 忘记密码弹框页面 -->
  <el-dialog
    v-model="status.forgetPasswordDialog"
    title="忘记密码"
    width="400px"
  >
    <el-form
      ref="forgetDataRef"
      @submit.native.prevent="EmailInquiry(forgetDataRef)"
      :model="forgetData"
      label-width="auto"
      label-position="top"
      :rules="forgetRules"
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
      <el-form-item>
        <div class="w-full flex justify-end">
          <el-button @click="status.forgetPasswordDialog = false"
            >取消</el-button
          >
          <el-button
            type="primary"
            native-type="submit"
            :loading="isForgetting"
          >
            下一步
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 确认修改密码弹框页面 -->
  <el-dialog
    v-model="status.changePasswordDialog"
    title="修改密码"
    width="400px"
  >
    <el-form
      ref="confirmDataRef"
      @submit.native.prevent="ForgetPasswordInLogin(confirmDataRef)"
      :model="confirmData"
      label-width="auto"
      label-position="top"
      :rules="confirmRules"
    >
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="confirmData.password"
          placeholder="请输入您想修改的密码"
          show-password
          type="password"
          clearable
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" class="mt-8!">
        <el-input
          v-model="confirmData.rePassword"
          placeholder="请再次输入您的密码"
          show-password
          type="password"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <div class="w-full flex justify-end">
          <el-button @click="status.changePasswordDialog = false"
            >取消</el-button
          >
          <el-button
            type="primary"
            native-type="submit"
            :loading="isConfirming"
          >
            确认修改
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { emailInquiry, forgetPasswordInLogin } from "@/api/userInfo";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { emailReg, passwordReg } from "@/utils/limit";
import type { confirmInter, forgetInter } from "@/utils/interface/login";

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

// 忘记密码这块
const isForgetting = ref(false);
const forgetData = reactive<forgetInter>({
  account: "",
  email: "",
});
const forgetDataRef = ref<FormInstance>();

const forgetRules = reactive<FormRules<forgetInter>>({
  account: [{ required: true, message: "您的账号不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "您的邮箱不能为空", trigger: "blur" },
    { pattern: emailReg, message: "您的邮箱格式不正确", trigger: "blur" },
  ],
});
// 调用EmailInquiry接口 验证账号与邮箱是否对应
const EmailInquiry = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;
    isForgetting.value = true;
    try {
      const res = await emailInquiry({
        account: forgetData.account,
        email: forgetData.email,
      });
      // console.log(res);
      if (res.data.status == 1) {
        isForgetting.value = false;
        ElMessage.error(res.data.message);
        return;
      }
      isForgetting.value = false;
      formEl.resetFields();
      ElMessage({
        message: res.data.message,
        type: "success",
      });
      localStorage.setItem("id", res.data.id);
      status.forgetPasswordDialog = false;
      status.changePasswordDialog = true;
    } catch (error: any) {
      isForgetting.value = false;
      ElMessage.error(error.message);
    }
  });
};

// 确认修改密码这块
const isConfirming = ref(false);

const confirmData = reactive<confirmInter>({
  password: "",
  rePassword: "",
});
const confirmDataRef = ref<FormInstance>();

const confirmRules = reactive<FormRules<confirmInter>>({
  password: [
    { required: true, message: "您的新密码不能为空", trigger: "blur" },
    {
      pattern: passwordReg,
      message:
        "您的密码至少有一个小写字母、一个大写字母、一个数字和一个特殊字符,且长度为8~16位",
      trigger: "blur",
    },
  ],
  rePassword: [
    { required: true, message: "您的确认密码不能为空", trigger: "blur" },
  ],
});

// 调用登录页面修改密码接口
const ForgetPasswordInLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;
    if(confirmData.password !== confirmData.rePassword){
      ElMessage.error('您的两次密码需要一致')
      return
    }
    const id = +localStorage.getItem("id")!;
    isConfirming.value = true;
    try {
      const res = await forgetPasswordInLogin({
        id,
        password: confirmData.password,
      });
      if (res.data.status == 1) {
        isConfirming.value = false;
        ElMessage.error(res.data.message);
        return;
      }
      isConfirming.value = false;
      formEl.resetFields();
      ElMessage({
        message: res.data.message,
        type: "success",
      });
      status.changePasswordDialog = false;
    } catch (error: any) {
      isForgetting.value = false;
      ElMessage.error(error.message);
    }
  });
};
</script>
