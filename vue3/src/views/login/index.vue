<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-content">
          <h3>通用后台管理系统</h3>
          <span>欢迎登录</span>
        </div>
      </el-header>
      <el-main class="main-wrapped">
        <div class="main-content">
          <el-card class="box-card">
            <el-tabs
              v-model="activeName"
              class="demo-tabs"
              :stretch="true"
              @keyup.enter="Login"
            >
              <el-tab-pane label="登录" name="first">
                <el-form :model="loginForm" label-width="auto">
                  <el-form-item label="账号">
                    <el-input
                      v-model="loginForm.account"
                      placeholder="请输入账号"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="loginForm.password"
                      placeholder="请输入密码"
                      show-password
                      type="password"
                      clearable
                    />
                  </el-form-item>
                </el-form>
                <div class="footer-wrapped">
                  <div class="forget-password">
                    <span class="forget-password-btn" @click="openforgetDialog"
                      >忘记密码</span
                    >
                  </div>
                  <div class="login-btn" @click="Login">
                    <el-button type="primary">登录</el-button>
                  </div>
                  <div class="go-register">
                    还没有账号?<span
                      class="go-register-btn"
                      @click="activeName = 'second'"
                      >去注册</span
                    >
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form :model="registerForm" label-width="auto">
                  <el-form-item label="账号">
                    <el-input
                      v-model="registerForm.account"
                      placeholder="账号长度为4~12位"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="registerForm.password"
                      placeholder="密码长度为8~16位"
                      show-password
                      type="password"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input
                      v-model="registerForm.rePassword"
                      placeholder="请再次输入密码"
                      show-password
                      type="password"
                      clearable
                    />
                  </el-form-item>
                </el-form>
                <div class="login-btn" @click="Register">
                  <el-button type="primary">注册</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div class="title">
            <span>小刘爱小朱</span> | <span>小朱爱小刘</span> |
            <span>健健爱西西</span> |
            <span>蔓蔓爱锋锋</span>
          </div>
        </div>
      </el-footer>
    </el-container>
    <!-- 忘记密码对话框的插槽 -->
    <forget_password ref="forgetPassword"></forget_password>
  </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from "vue";
import forget_password from "./components/forget_password.vue";
import { register, login } from "@/api/login";
import { ElMessage } from "element-plus";
import { passwordReg } from "@/utils/limit/index";
import { useRouter } from "vue-router";
const router = useRouter();
import { useUserInfo } from "@/store/userInfo";
const { GetUserInfo } = useUserInfo();

// 默认进来是登录
const activeName = ref("first");
// 登录表单
const loginForm: InterLogin = reactive({
  account: "",
  password: "",
});
// 注册表单
const registerForm: InterLogin = reactive({
  account: "",
  password: "",
  rePassword: "",
});
// 定义ref的标签
const forgetPassword = ref();
// 打开弹框
const openforgetDialog = () => {
  forgetPassword.value.openDialog();
};

// 调用注册接口
const Register = async () => {
  if (
    !registerForm.account ||
    !registerForm.password ||
    !registerForm.rePassword
  ) {
    ElMessage.error("您的账号或密码不能为空");
    return;
  }
  if (registerForm.password !== registerForm.rePassword) {
    ElMessage.error("您两次输入的密码不一致");
    return;
  }
  if (registerForm.account.length < 4 || registerForm.account.length > 16) {
    ElMessage.error("您账号的长度要为4~16位");
    return;
  }
  // 定义密码的正则
  if (!passwordReg.test(registerForm.password)) {
    ElMessage.error(
      "您的密码至少有一个小写字母、一个大写字母、一个数字和一个特殊字符,且长度为8~16位"
    );
    return;
  }
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
    setTimeout(() => {
      activeName.value = "first";
    }, 1500);
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};
// 调用登录接口
const Login = async () => {
  if (!loginForm.account || !loginForm.password) {
    ElMessage.error("您的账号或密码不能为空");
    return;
  }
  try {
    const res = await login(loginForm);
    if (res.data.status == 1) {
      ElMessage.error(res.data.message || "登录失败");
      return;
    }
    // 返回登录成功的结果
    // console.log(res);
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
};

// setTimeout(() => {
//   loginForm.account = "蒲公英的约定";
//   loginForm.password = "@Ljf1314520";
// }, 500);
</script>

<style lang="css" scoped>
 /* 头部外壳 */
.header-wrapped {
   /* 头部内容 */
  .header-content {
    width: 1200px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 13px;
    }
  }
}

 /* 主体外壳 */
.main-wrapped {
  background-image: url(@/assets/img/loginBackImg.jpg);
  height: 750px;

  --el-main-padding: 0;

   /* 主体内容 */
  .main-content {
    width: 1200px;
    height: 750px;
    margin: 0 auto;

     /* 卡片样式 */
    .box-card {
      width: 350px;
      height: 375px;
      float: right;
      position: relative;
      top: 130px;

      .el-form {
        margin-top: 30px;
      }

      /* 卡片底部外壳 */
      .footer-wrapped {
        display: flex;
        flex-direction: column;

         /* 忘记密码 */
        .forget-password {
          display: flex;
          justify-content: flex-end;
          margin: 8px 0;

          .forget-password-btn {
            color: #409eff;
            font-size: 12px;
            cursor: pointer;
          }
        }

         /* 去注册 */
        .go-register {
          display: flex;
          justify-content: center;
          font-size: 14px;

          .go-register-btn {
            color: #409eff;
            cursor: pointer;
          }
        }
      }

       /* 登录 */
      .login-btn {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: 4px 0;
      }
    }
  }
}

 /* 页脚外壳 */
.footer-wrapped {
  margin: 8px 0;

   /* 页脚内容 */
  .footer-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    span {
      color: #666;
      font-size: 12px;
    }
  }
}

 /* 样式穿透 */
 /* tags标签 */
:deep(.el-tabs__item) {
  color: #333;
  font-size: 18px;
}

 /* 输入框高度 */
:deep(.el-input__inner) {
  height: 40px;
}

 /* 输入框标签字体高度 */
:deep(.el-form-item__label) {
  line-height: 40px;
  height: 40px;
}

 /* 登录按钮 */
:deep(.el-button) {
  width: 240px;
  height: 45px;
}
</style>
