<template>
  <!-- 公司名称 -->
  <div class="company-name-wrapped">
    <span>公司名称</span>
    <div class="company-name-content">
      <el-input
        v-model="companyName"
        style="width: 240px"
        placeholder="公司名称"
      />
    </div>
    <el-button
      type="primary"
      @click="ChangeCompanyName"
      :disabled="!companyNameFlag"
      >修改公司名称</el-button
    >
  </div>
  <!-- 公司介绍 -->
  <div class="company-name-wrapped">
    <span class="span">公司介绍</span>
    <el-button type="success" @click="bus.emit('sendValueId', 8)"
      >编辑公司介绍</el-button
    >
  </div>
  <!-- 公司架构 -->
  <div class="company-name-wrapped">
    <span class="span">公司架构</span>
    <el-button type="success" @click="bus.emit('sendValueId', 9)"
      >编辑公司架构</el-button
    >
  </div>
  <!-- 公司战略 -->
  <div class="company-name-wrapped">
    <span class="span">公司战略</span>
    <el-button type="success" @click="bus.emit('sendValueId', 10)"
      >编辑公司战略</el-button
    >
  </div>
  <!-- 现任高层 -->
  <div class="company-name-wrapped">
    <span class="span">现任高层</span>
    <el-button type="success" @click="bus.emit('sendValueId', 11)"
      >编辑现任高层</el-button
    >
  </div>
  <Editor ref="editor"></Editor>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Editor from "./editor.vue";
import { bus } from "@/utils/mitt";
import { changeCompanyName, getAllCompanyIntroduce } from "@/api/setting";
import { ElMessage } from "element-plus";

const companyName = ref("");

let Name: string = "";
const companyNameFlag = ref(false);

// 获取公司名称接口
(async () => {
  const res = await getAllCompanyIntroduce();
  companyName.value = res.data.results[0].set_value;
  Name = res.data.results[0].set_value;
})();

// 监听公司名称修改, 并修改按钮状态
watch(companyName, (newVal) => {
  if (newVal === Name) {
    companyNameFlag.value = false;
  } else {
    companyNameFlag.value = true;
  }
});

// 修改公司名称接口
const ChangeCompanyName = async () => {
  if (!companyName.value) {
    ElMessage.error("您的公司名称不能为空");
    return;
  }
  Name = companyName.value;
  companyNameFlag.value = false;
  const res = await changeCompanyName(companyName.value);
  // console.log(res);
  ElMessage({
    message: res.data.message,
    type: "success",
  });
};
</script>

<style lang="css" scoped>
 /* 公司信息外壳 */
.company-name-wrapped {
  padding: 15px 50px;
  display: flex;
  align-items: center;
  font-size: 14px;

   /* 公司信息内容 */
  .company-name-content {
    padding: 0 16px;
  }

  .span {
    padding-right: 16px;
  }
}
</style>
