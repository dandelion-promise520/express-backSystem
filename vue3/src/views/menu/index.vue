<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
          <div class="title">
            <span>通用后台管理系统</span>
          </div>
          <el-menu-item index="home">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="systemOverview">
            <el-icon>
              <Document />
            </el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <!-- 有子菜单 -->
          <el-sub-menu index="userManagement">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="productManager">产品管理员</el-menu-item>
              <el-menu-item index="userManager">用户管理员</el-menu-item>
              <el-menu-item index="messageManager">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="userList">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="productManagement">
            <template #title>
              <el-icon>
                <Goods />
              </el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="productList">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="outboundList">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="messageManagement">
            <template #title>
              <el-icon>
                <ChatSquare />
              </el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="messageList">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="recycleBin">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 有子菜单 -->
          <el-menu-item index="contractManagement">
            <el-icon>
              <Files />
            </el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="operationLog">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-menu-item index="loginLog">
            <el-icon>
              <Notebook />
            </el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="set">
            <el-icon>
              <Setting />
            </el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header-wrapped">
          <div class="header-left-content">
            <span>尊贵的 {{ user }} 欢迎您登录本系统 </span>
          </div>
          <div class="header-right-content">
            <el-icon color="#fff" style="cursor: pointer">
              <Message />
            </el-icon>
            <div>
              <el-avatar
                :icon="UserFilled"
                :src="accountDetailData.image_url"
                :size="30"
                style="cursor: pointer"
                @click="centerDialogVisible = true"
              />
            </div>
            <!-- 下拉菜单 -->
            <el-dropdown>
              <span class="el-dropdown-link"> 设置 </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goSet">设置账号</el-dropdown-item>
                  <el-dropdown-item @click="centerDialogVisible = true"
                    >更改头像</el-dropdown-item
                  >
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- 下拉菜单 -->
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- 更换头像对话框 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="更换头像"
      width="500"
      center
    >
      <el-col :span="12">
        <div class="demo-basic--circle">
          <div class="block">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-avatar
                :size="120"
                :src="accountDetailData.image_url"
                style="cursor: pointer"
              />
            </el-upload>
          </div>
        </div>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { ref, toRefs, watch } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserInfo } from "@/store/userInfo";
import {
  beforeAvatarUpload,
  accountDetailData,
} from "@/views/set/hooks/useAccountDetails";
import type { UploadProps } from "element-plus";
import { bandAccount } from "@/api/userInfo";

const uploadUrl = ref(import.meta.env.VITE_API_BASE_URL + "/user/uploadAvatar"); // 上传的图片服务器地址

// 判断是否有token，如没有则强制跳回登录页面
watch(
  () => router.currentRoute.value.path,
  (to) => {
    if (to === "/login") {
      localStorage.clear();
    }
  }
);
const token = localStorage.getItem("token");
if (!token) {
  router.push("/login");
}

// 获取存储在pinia的用户数据
const { image_url, name } = toRefs(useUserInfo());
const { account } = useUserInfo();

const user = ref(name);
const goLogin = () => {
  ElMessage({
    message: "已退出登录",
    type: "success",
  });
  localStorage.clear();
  setTimeout(() => {
    router.push("login");
  }, 1500);
};

// 更改头像对话框逻辑
const centerDialogVisible = ref(false);

// 上传头像成功回调
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
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

// 设置账号逻辑
const goSet = () => {
  router.push("/set");
};
</script>

<style lang="css" scoped>
/* 侧边栏外壳 */
.el-menu-vertical-demo {
  height: 100vh;
  overflow-x: hidden;
  /* height: 100%; */
  background-color: #2a303a;

  /* 侧边栏标题 */
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2a303a;
    color: #fff;
    height: 60px;
    width: 200px;
  }

  /* 侧边栏内容 */
  .el-menu-item {
    color: #fff;
    background-color: #2a303a;
  }
}

/* 头部外壳 */
.header-wrapped {
  height: 60px;
  background-color: #2a303a;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 头部左侧内容 */
  .header-left-content {
    span {
      color: #fff;
      font-size: 14px;
    }
  }

  /* 头部右侧内容 */
  .header-right-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 160px;

    .el-dropdown-link {
      cursor: pointer;
    }
  }
}

/* 主要内容区 */
.el-main {
  --el-main-padding: 0;
}

/* 无子菜单改hover背景颜色 */
:deep(.el-menu-item:hover) {
  background-color: rgb(219, 151, 26);
}

/* 有子菜单改字体颜色与背景颜色 */
:deep(.el-sub-menu__title) {
  color: #fff;
}

:deep(.el-sub-menu__title:hover) {
  background-color: rgb(219, 151, 26);
}

:deep(.el-menu-item-group__title) {
  background-color: #2a303a;
}

/* 去除边框 */
:deep(.el-menu) {
  border: 0;
}

/* 更改密码对话框样式 */
:deep(.el-dialog__body) {
  display: flex;
  justify-content: center;
}

:deep(.el-dialog__title) {
  margin-left: 20px;
}

.block {
  display: flex;
  justify-content: center;
}
</style>
