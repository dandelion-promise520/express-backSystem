<template>
  <div>
    <el-container>
      <!-- 头部这块 -->
      <el-header class="flex w-full justify-between items-center px-48!">
        <h3>通用后台管理系统</h3>
        <span class="text-sm">欢迎登录</span>
      </el-header>
      <!-- 身体这块 -->
      <el-main class="h-[750px] bg-[url(@/assets/img/loginBackImg.jpg)]">
        <div class="w-full pr-42 h-full flex items-center justify-end">
          <el-card class="h-96 w-sm">
            <el-tabs v-model="activeName" :stretch="true">
              <!-- 登录这块 -->
              <el-tab-pane label="登录" name="first">
                <!-- 表单这块 -->
                <el-form
                  size="large"
                  class="mt-8"
                  :hide-required-asterisk="true"
                  :model="loginForm"
                  ref="loginFormRef"
                  label-width="auto"
                  :rules="loginRules"
                  @submit.native.prevent="Login(loginFormRef)"
                >
                  <el-form-item prop="account">
                    <el-input
                      v-model="loginForm.account"
                      name="account"
                      placeholder="用户名"
                      autocomplete="account"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password"
                      name="password"
                      autocomplete="password"
                      placeholder="密码"
                      type="password"
                      show-password
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label-width="auto">
                    <el-button
                      type="primary"
                      native-type="submit"
                      :loading="isLogging"
                      class="w-full h-12! mt-4"
                    >
                      {{ isLogging ? "登录中..." : "登录" }}
                    </el-button>
                  </el-form-item>
                </el-form>
                <!-- 底部这块 -->
                <div>
                  <div class="flex justify-end">
                    <span
                      class="cursor-pointer text-primary-500 text-xs"
                      @click="openForgetDialog"
                      >忘记密码</span
                    >
                  </div>
                  <div class="flex justify-center text-sm">
                    还没有账号?<span
                      class="cursor-pointer text-primary-500"
                      @click="activeName = 'second'"
                      >去注册</span
                    >
                  </div>
                </div>
              </el-tab-pane>

              <!-- 注册这块  -->
              <el-tab-pane label="注册" name="second">
                <el-form
                  size="large"
                  label-width="auto"
                  :hide-required-asterisk="true"
                  ref="registerFormRef"
                  :model="registerForm"
                  :rules="registerRules"
                  @submit.native.prevent="Register(registerFormRef)"
                >
                  <el-form-item label="账号" prop="account" class="mt-4!">
                    <el-input
                      v-model="registerForm.account"
                      placeholder="账号长度为4~12位"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="密码" prop="password" class="mt-8!">
                    <el-input
                      v-model="registerForm.password"
                      placeholder="密码长度为8~16位"
                      show-password
                      type="password"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item
                    label="确认密码"
                    prop="rePassword"
                    class="mt-8!"
                  >
                    <el-input
                      v-model="registerForm.rePassword"
                      placeholder="请再次输入密码"
                      show-password
                      type="password"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      native-type="submit"
                      class="w-full h-12! mt-4"
                      :loading="isRegistering"
                      >{{ isRegistering ? "注册中..." : "注册" }}</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <!-- 玉足这块 -->
      <el-footer class="w-full flex justify-center mt-4">
        <div class="[&>span]:text-xs">
          <span>小刘爱小朱</span> | <span>小朱爱小刘</span> |
          <span>健健爱西西</span> |
          <span>蔓蔓爱锋锋</span>
        </div>
      </el-footer>
    </el-container>
    <!-- 忘记密码对话框的插槽 -->
    <forget_password ref="forgetPassword"></forget_password>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import forget_password from "./components/forget_password.vue";
import { register, login } from "@/api/login";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import {type loginFormInter, type registerFormInter} from '@/utils/interface/login'
import { passwordReg } from "@/utils/limit/index";
import { useRouter } from "vue-router";
const router = useRouter();
import { useUserInfo } from "@/store/userInfo";
const { GetUserInfo } = useUserInfo();

// 默认进来是登录tab
const activeName = ref("first");

// 忘记密码这块
const forgetPassword = ref();
// 打开弹框
const openForgetDialog = () => {
  forgetPassword.value.openDialog();
};

// 判断是否已经在注册中
const isRegistering = ref(false);

// 注册表单
const registerForm = reactive<registerFormInter>({
  account: "",
  password: "",
  rePassword: "",
});

const registerFormRef = ref<FormInstance>();
const registerRules = reactive<FormRules<registerFormInter>>({
  account: [
    {
      required: true,
      message: "您的账号不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "您的密码不能为空",
      trigger: "blur",
    },
    {
      pattern: passwordReg,
      message: "您的密码必须在8-16位之间，至少有一位大小写字母且有一个特殊字符",
      trigger: "blur",
    },
  ],
  rePassword: [
    {
      required: true,
      message: "您的密码不能为空",
      trigger: "blur",
    },
    {
      pattern: passwordReg,
      message: "您的密码必须在8-16位之间，至少有一位大小写字母且有一个特殊字符",
      trigger: "blur",
    },
  ],
});

// 调用注册接口
const Register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;
    if (registerForm.password !== registerForm.rePassword) {
      ElMessage.error("您两次输入的密码不一致");
      return;
    }
    isRegistering.value = true;
    try {
      const res = await register(registerForm);
      // console.log(res);
      if (res.data.status == 1) {
        ElMessage.error(res.data.message);
        return;
      }
      ElMessage({
        message: "注册成功",
        type: "success",
      });
      registerFormRef.value?.resetFields();
      setTimeout(() => {
        activeName.value = "first";
      }, 500);
      isRegistering.value = false;
    } catch (error: any) {
      ElMessage.error(error.message);
      isRegistering.value = false;
    }
  });
};

// 判断是否已经在登录中
const isLogging = ref(false);
// 登录表单
const loginForm = reactive<loginFormInter>({
  account: "",
  password: "",
});
const loginFormRef = ref<FormInstance>();

const loginRules = reactive<FormRules<loginFormInter>>({
  account: [
    {
      required: true,
      message: "您的账号不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "您的密码不能为空",
      trigger: "blur",
    },
    {
      pattern: passwordReg,
      message: "您的密码必须在8-16位之间，至少有一位大小写字母且有一个特殊字符",
      trigger: "blur",
    },
  ],
});

// 调用登录接口
const Login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;
    isLogging.value = true;
    try {
      const res = await login(loginForm);
      if (res.data.status == 1) {
        ElMessage.error(res.data.message || "登录失败");
        isLogging.value = false;
        return;
      }
      // 返回登录成功的结果
      console.log(res.data.results);
      const { id } = res.data.results;
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      GetUserInfo(id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", id);
      setTimeout(() => {
        router.push("/menu");
      }, 1500);
    } catch (error: any) {
      ElMessage.error(error.message || "登录失败");
    }
  });
};

// setTimeout(() => {
//   loginForm.account = "蒲公英的约定";
//   loginForm.password = "@Ljf1314520";
// }, 500);
</script>
