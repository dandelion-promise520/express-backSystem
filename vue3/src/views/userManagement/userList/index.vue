<template>
  <!-- 面包屑 -->
  <Breadcrumb :item="item" />

  <!-- 整体结构 -->
  <div class="global-content">
    <!-- 头部区域 -->
    <div class="header">
      <div class="header-left">
        <el-input
          v-model="searchInput"
          style="width: 240px"
          placeholder="输入账号进行搜索"
          :prefix-icon="Search"
          @change="searchAccount"
        />
        <el-select
          v-model="department"
          placeholder="请选择部门"
          style="width: 120px; margin-left: 8px"
          @change="FilterDepartment"
        >
          <el-option label="产品部" value="产品部" />
          <el-option label="技术部" value="技术部" />
          <el-option label="市场部" value="市场部" />
          <el-option label="运营部" value="运营部" />
        </el-select>
      </div>
      <div class="header-right">
        <el-button type="primary" plain @click="filterBanUser"
          >筛选冻结用户</el-button
        >
        <el-button type="primary" plain @click="getUserData"
          >显示全部用户</el-button
        >
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="table-wrapped">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @row-click="handleUserInfo"
      >
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column label="账号" prop="account" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="部门" prop="department" width="80" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="状态" width="80" style="height: 20px">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '0' ? 'success' : 'danger'"
              style="height: 20px"
            >
              {{ scope.row.status === "0" ? "正常" : "冻结" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" />
        <el-table-column label="更新时间" prop="update_time" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              @click="freezeUserDialog(scope.row.id)"
              :disabled="scope.row.status === '1'"
              >冻结</el-button
            >
            <el-button
              type="success"
              @click="unfreezeUserDialog(scope.row.id)"
              :disabled="scope.row.status === '0'"
              >解冻</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 冻结对话框 -->
  <FreezeDialog
    v-model="freezeDialogVisible"
    :is-freeze="true"
    @confirm="freezeUser"
  />

  <!-- 解冻对话框 -->
  <FreezeDialog
    v-model="unfreezeDialogVisible"
    :is-freeze="false"
    @confirm="unfreezeUser"
  />

  <!-- 用户信息对话框-->
  <UserInfoDialog
    :userInfo="userInfo"
    v-model="userInfo.flag"
    @edit-user="editUser"
    @assign-role="assignRole"
    @delete-user="deleteUser"
  />

  <!-- 编辑用户对话框-->
  <EditorUserDialog
    v-model="editDialogVisible"
    title="编辑用户"
    :form="userInfo"
    @cancel="editDialogVisible = false"
    @confirm="editUserConfirm"
  />
  <!-- 赋权对话框-->

  <!-- 删除用户对话框-->
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import {
  getAllUser,
  changeUser,
  getBanUsersList,
  searchUser,
  filterDepartment,
  editAdmin,
} from "@/api/userInfo";
import { ElMessage } from "element-plus";
import UserInfoDialog from "../components/UserInfoDialog.vue";
import FreezeDialog from "../components/FreezeDialog.vue";
import EditorUserDialog from "../components/EditorUserDialog.vue";

const item = {
  first: "用户管理",
  second: "用户列表",
};

// 搜索框
const searchInput = ref("");
// 部门选择
const department = ref("");
// 表格初始化
const tableData = ref([]);
// 冻结与解冻弹框初始化
const freezeDialogVisible = ref(false);
const unfreezeDialogVisible = ref(false);

// 搜索账号
const searchAccount = async () => {
  const res = await searchUser({ account: searchInput.value });
  tableData.value = res.data;
};

// 部门选择
const FilterDepartment = async () => {
  const res = await filterDepartment({ department: department.value });
  tableData.value = res.data;
};

// 获取用户列表封装
const getUserData = async () => {
  const res = await getAllUser();
  tableData.value = res.data;
};
// 页面加载完成后获取用户列表
onMounted(async () => {
  await getUserData();
});

// 筛选冻结用户
const filterBanUser = async () => {
  const res = await getBanUsersList();
  tableData.value = res.data;
};

// 冻结用户
const freezeFlag = ref<number>();
const freezeUserDialog = (id: number) => {
  freezeDialogVisible.value = true;
  // 传递id值
  freezeFlag.value = id;
};
// 确定冻结按钮 发送请求，冻结用户
const freezeUser = async () => {
  if (freezeFlag.value) {
    try {
      const res = await changeUser({ id: freezeFlag.value, status: "1" });
      ElMessage.success(res.data.message);
      // 刷新用户列表
      getUserData();
    } catch (err) {
      ElMessage.error("冻结失败");
    }
  }
  freezeDialogVisible.value = false;
};

// 解冻用户
const unfreezeFlag = ref<number>();
const unfreezeUserDialog = (id: number) => {
  unfreezeDialogVisible.value = true;
  // 传递id值
  unfreezeFlag.value = id;
};
// 确定解冻按钮 发送请求，解冻用户
const unfreezeUser = async () => {
  if (unfreezeFlag.value) {
    try {
      const res = await changeUser({ id: unfreezeFlag.value, status: "0" });
      ElMessage.success(res.data.message);
      // 刷新用户列表
      getUserData();
    } catch (err) {
      ElMessage.error("解冻失败");
    }
  }
  unfreezeDialogVisible.value = false;
};
// 用户信息弹框
const userInfo = ref({
  id: 0,
  account: "",
  name: "",
  sex: "",
  department: "",
  email: "",
  status: "",
  image_url: "",
  flag: false,
});
const handleUserInfo = (row: any, e: any) => {
  if (e.label === "操作") return;
  userInfo.value.flag = true;
  userInfo.value = row;
};
// 编辑用户对话框初始化
const editDialogVisible = ref(false);

//编辑用户的逻辑
const editUser = () => {
  editDialogVisible.value = true;
};

// 编辑用户确定逻辑
const editUserConfirm = async () => {
  try {
    const res = await editAdmin(userInfo.value);
    ElMessage.success(res.data.message);
    editDialogVisible.value = false;
    // 刷新用户列表
    getUserData();
  } catch (err) {
    ElMessage.error("更新失败");
  }
};

// 删除用户的逻辑
const deleteUser = () => {
  console.log("删除用户");
};

// 赋权的逻辑
const assignRole = () => {
  console.log("赋权");
};
</script>

<style scoped lang="css">
.global-content {
  padding: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
  }
}
</style>
