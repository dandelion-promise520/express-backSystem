<template>
  <div class="account-details-wrapped">
    <!-- 用户头像 -->
    <span>用户头像:</span>
    <div class="account-details-content">
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="accountDetailData.image_url" :src="accountDetailData.image_url" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
  </div>
  <!-- 用户账号 -->
  <div class="account-details-wrapped">
    <span>用户账号:</span>
    <div class="account-details-content">
      <el-input
        v-model="accountDetailData.account"
        style="width: 240px"
        placeholder="账号"
      />
    </div>
    <el-button type="primary" @click="ChangeAccount" :disabled="!accountFlag"
      >修改账号</el-button
    >
  </div>
  <!-- 用户密码 -->
  <div class="account-details-wrapped">
    <span>用户密码:</span>
    <div class="account-details-content">
      <el-input style="width: 240px" placeholder="******" disabled />
    </div>
    <el-button type="primary" @click="openChangeDialog">修改密码</el-button>
  </div>
  <!-- 用户姓名 -->
  <div class="account-details-wrapped">
    <span>用户姓名:</span>
    <div class="account-details-content">
      <el-input
        v-model="accountDetailData.name"
        style="width: 240px"
        placeholder="姓名"
      />
    </div>
    <el-button type="primary" @click="ChangeName" :disabled="!nameFlag"
      >保存</el-button
    >
  </div>
  <!-- 用户性别 -->
  <div class="account-details-wrapped">
    <span>用户性别:</span>
    <div class="account-details-content">
      <el-select
        v-model="accountDetailData.sex"
        placeholder="性别"
        style="width: 240px"
      >
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="woman"></el-option>
      </el-select>
    </div>
    <el-button type="primary" @click="ChangeSex" :disabled="!sexFlag"
      >保存</el-button
    >
  </div>
  <!-- 用户身份 -->
  <div class="account-details-wrapped">
    <span>用户身份:</span>
    <div class="account-details-content">
      <el-input
        v-model="accountDetailData.identity"
        style="width: 240px"
        disabled
        placeholder="身份"
      />
    </div>
  </div>
  <!-- 用户部门 -->
  <div class="account-details-wrapped">
    <span>用户部门:</span>
    <div class="account-details-content">
      <el-input
        v-model="accountDetailData.department"
        style="width: 240px"
        placeholder="部门"
        disabled
      />
    </div>
  </div>
  <!-- 用户邮箱 -->
  <div class="account-details-wrapped">
    <span>用户邮箱:</span>
    <div class="account-details-content">
      <el-input
        v-model="accountDetailData.email"
        style="width: 240px"
        placeholder="邮箱"
      />
    </div>
    <el-button type="primary" @click="ChangeEmail" :disabled="!emailFlag"
      >保存</el-button
    >
  </div>
  <!-- 修改密码对话框的插槽 -->
  <change_password ref="changePassword"></change_password>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import {
  accountFlag,
  nameFlag,
  sexFlag,
  emailFlag,
  handleAvatarSuccess,
  beforeAvatarUpload,
  accountDetailData,
  ChangeAccount,
  ChangeName,
  ChangeSex,
  ChangeEmail,
} from "@/views/set/hooks/useAccountDetails";
import change_password from "@/views/set/components/change_password.vue";

const uploadUrl = ref(import.meta.env.VITE_API_BASE_URL + "/user/uploadAvatar") // 上传的图片服务器地址

onMounted(()=>{
  if (localStorage.getItem("id")){
    const id = +localStorage.getItem("id")!;
    accountDetailData.GetUserInfo(id);
  }
})

// 插槽
const changePassword = ref();
// 打开弹窗
const openChangeDialog = () => {
  changePassword.value.openDialog();
};
</script>

<style scoped lang="scss">
// 账号详情外壳
.account-details-wrapped {
  padding: 15px 50px;
  display: flex;
  align-items: center;
  font-size: 14px;

  // 账号详情内容
  .account-details-content {
    padding: 0 35px;

    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
