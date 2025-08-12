<template>
  <div class="set-flex">
    <!-- 用户头像 -->
    <span>用户头像</span>
    <div>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="accountDetailData.image_url"
          :src="accountDetailData.image_url"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
  </div>
  <!-- 用户账号 -->
  <el-form @submit.native.prevent="ChangeAccount" class="set-flex">
    <el-form-item label="用户账号">
      <el-input
        v-model="accountDetailData.account"
        style="width: 240px"
        placeholder="账号"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" :disabled="!accountFlag"
        >修改账号</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 用户密码 -->
  <el-form @submit.native.prevent="openChangeDialog" class="set-flex">
    <el-form-item label="用户密码">
      <el-input style="width: 240px" placeholder="******" disabled />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">修改密码</el-button>
    </el-form-item>
  </el-form>
  <!-- 用户姓名 -->
  <el-form @submit.native.prevent="ChangeName" class="set-flex">
    <el-form-item label="用户姓名">
      <el-input
        v-model="accountDetailData.name"
        style="width: 240px"
        placeholder="姓名"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" :disabled="!nameFlag"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 用户性别 -->
  <el-form @submit.native.prevent="ChangeSex" class="set-flex">
    <el-form-item label="用户性别">
      <el-select
        v-model="accountDetailData.sex"
        placeholder="性别"
        style="width: 240px"
      >
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="woman"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" :disabled="!sexFlag"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 用户身份 -->
  <el-form class="set-flex">
    <el-form-item label="用户身份">
      <el-input
        v-model="accountDetailData.identity"
        style="width: 240px"
        disabled
        placeholder="身份"
      />
    </el-form-item>
  </el-form>
  <!-- 用户部门 -->
  <el-form class="set-flex">
    <el-form-item label="用户部门">
      <el-input
        v-model="accountDetailData.department"
        style="width: 240px"
        placeholder="部门"
        disabled
      />
    </el-form-item>
  </el-form>
  <!-- 用户邮箱 -->
  <el-form class="set-flex">
    <el-form-item label="用户邮箱">
      <el-input
        v-model="accountDetailData.email"
        style="width: 240px"
        placeholder="邮箱"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="ChangeEmail" :disabled="!emailFlag"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 修改密码对话框的插槽 -->
  <change_password ref="changePassword"></change_password>
</template>

<script setup lang="ts">
import { ref } from "vue";
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

const uploadUrl = ref(import.meta.env.VITE_API_BASE_URL + "/user/uploadAvatar"); // 上传的图片服务器地址

// 插槽
const changePassword = ref();
// 打开弹窗
const openChangeDialog = () => {
  changePassword.value.openDialog();
};
</script>

<style scoped lang="css">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
