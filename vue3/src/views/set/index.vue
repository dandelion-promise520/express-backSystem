<template>
  <div class="bread-crumb-wrapped">
    <Breadcrumb ref="breadcrumb" :item="item"></Breadcrumb>
  </div>
  <!-- 外壳 -->
  <div class="p-5">
    <!-- 内容 -->
    <div>
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
