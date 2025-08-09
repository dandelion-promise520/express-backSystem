<template>
  <div class="bread-crumb-wrapped">
    <Breadcrumb ref="breadcrumb" :item="item"></Breadcrumb>
  </div>
  <!-- 外壳 -->
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <AccountDetails></AccountDetails>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <CompanyInformation></CompanyInformation>
        </el-tab-pane>
        <el-tab-pane label="首页管理" name="third">
          <HomeManagement></HomeManagement>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">
          <OtherSettings></OtherSettings>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref } from "vue";
import AccountDetails from "@/views/set/components/AccountDetails.vue";
import CompanyInformation from "@/views/set/components/CompanyInformation.vue";
import OtherSettings from "@/views/set/components/OtherSettings.vue";
import HomeManagement from "@/views/set/components/HomeManagement.vue";

const item = ref({
  first: "系统设置",
});
// 标签页默认选择
const activeName = ref("first");
</script>

<style lang="scss" scoped>
// 主体外壳
.common-wrapped {
  padding: 20px 20px;

  .common-content {
    height: 100%;
  }
}
</style>

<!-- 上传头像样式 -->
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
