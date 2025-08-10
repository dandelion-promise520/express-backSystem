<template>
  <!-- 面包屑 -->
  <Breadcrumb ref="breadcrumb" :item="item"></Breadcrumb>

  <!-- 整体结构 -->
  <div class="global-content">
    <!-- 头部区域 -->
    <div class="header">
      <el-input
        v-model="searchInput"
        style="width: 240px"
        placeholder="输入账号进行搜索"
        :prefix-icon="Search"
        @change="searchAccount"
      >
      </el-input>
      <el-button type="primary" @click="dialogAddAdmin = true"
        >添加{{ props.item }}</el-button
      >
    </div>
    <!-- 表格区域 -->
    <div class="table-wrapped">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="部门" prop="department"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="更新时间" prop="update_time"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" @click="openDialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="openDialogDeleteAdmin(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 添加管理员对话框 -->
  <el-dialog
    v-model="dialogAddAdmin"
    :title="`添加${props.item}`"
    width="500"
    draggable
  >
    <el-form
      ref="addFormRef"
      :model="Addform"
      label-width="80px"
      :rules="rulesAdd"
      style="width: 320px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="Addform.account" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="Addform.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="Addform.name" clearable />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="Addform.sex">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="Addform.department">
          <el-option label="产品部" value="产品部"></el-option>
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="运营部" value="运营部"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="Addform.email" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelAdd">取消</el-button>
        <el-button type="primary" @click="AddAdmin">确认</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 编辑对话框 -->
  <!-- <el-dialog v-model="dialogFormVisible" title="编辑用户账号信息" width="500" draggable>
        <el-form ref="editFormRef" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="ID" prop="id">
                <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" disabled />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="department">
                <el-select v-model="form.department">
                    <el-option label="产品部" value="产品部"></el-option>
                    <el-option label="技术部" value="技术部"></el-option>
                    <el-option label="运营部" value="运营部"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelEdit">取消</el-button>
                <el-button type="primary" @click="EditAdmin" :disabled="!isFormChanged">确认</el-button>
            </div>
        </template>
    </el-dialog> -->
  <EditorUserDialog
    v-model="dialogFormVisible"
    title="编辑用户"
    :form="form"
    @cancel="dialogFormVisible = false"
    @confirm="dialogFormVisible = false"
  />
  <!-- 删除对话框 -->
  <el-dialog
    v-model="dialogDeleteAdmin"
    :title="`删除${props.item}管理员`"
    width="500"
    draggable
  >
    <p>确定要删除该{{ props.item }}吗？</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogDeleteAdmin = false">取消</el-button>
        <el-button type="primary" @click="DeleteAdmin">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Search } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import {
  createAdmin,
  getAdminList,
  editAdmin,
  changeAdmin,
  searchUser,
} from "@/api/userInfo";
import { ElMessage, type FormInstance } from "element-plus";
import { rulesAdd } from "../hooks/useRules";
import EditorUserDialog from "./EditorUserDialog.vue";
const props = defineProps(["item"]);

// 引入面包屑
const item = ref({
  first: "用户管理",
  second: `${props.item}`,
});

// 搜索框初始化
const searchInput = ref("");

// 搜索账号逻辑
const searchAccount = async () => {
  const res = await searchUser({
    account: searchInput.value,
    identity: props.item,
  });
  tableData.value = res.data;
};

// 添加管理员对话框
const dialogAddAdmin = ref(false);
// 添加管理员表单数据
const Addform = ref({
  account: "",
  name: "",
  password: "",
  department: "",
  email: "",
  sex: "",
});
// 添加管理员接口
const AddAdmin = async () => {
  if (!addFormRef.value) return;

  await addFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await createAdmin({
          ...Addform.value,
          identity: props.item,
        });
        if (res.data.status === 0) {
          ElMessage.success("添加成功");
          cancelAdd();
          GetAdminList();
        } else {
          ElMessage.error("添加失败");
        }
      } catch (err: any) {
        ElMessage.error(err.message || "添加失败");
      }
    }
  });
};

// 表格数据
const tableData = ref([]);

// 获取所有管理员接口
const GetAdminList = async () => {
  try {
    const res = await getAdminList({
      identity: props.item,
    });
    tableData.value = res.data;
  } catch (err) {
    if (err) {
      ElMessage.error(err);
    }
  }
};
GetAdminList();

// 编辑对话框
const dialogFormVisible = ref(false);
// 输入框表单数据
const form = ref({
  id: 0,
  account: "",
  name: "",
  sex: "",
  department: "",
  email: "",
  updateTime: "",
  flag: false,
});

// 打开对话框获取用户账号信息逻辑
// 定义ts接口
const openDialog = (row: InterUser) => {
  dialogFormVisible.value = true;
  // Object.assign 方法可以将 row 对象的所有可枚举属性复制到 form.value 对象中，从而减少代码量并提高可读性。
  Object.assign(form.value, row);
};

// 取消编辑
const cancelEdit = () => {
  dialogFormVisible.value = false;
  form.value = {
    id: 0,
    account: "",
    name: "",
    department: "",
    email: "",
    sex: "",
    updateTime: "",
    flag: false,
  };
};

// 编辑用户账号信息接口
const EditAdmin = async () => {
  if (!editFormRef.value) return;

  await editFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await editAdmin({
          id: form.value.id,
          account: form.value.account,
          name: form.value.name,
          department: form.value.department,
          email: form.value.email,
          sex: form.value.sex,
        });
        if (res.data.status === 0) {
          ElMessage.success("修改成功");
          cancelEdit();
          GetAdminList();
        } else if (res.data.status === 1) {
          ElMessage.error(res.data.message);
        } else {
          ElMessage.error("修改失败");
        }
      } catch (err: any) {
        ElMessage.error(err.message || "修改失败");
      }
    }
  });
};

// 删除对话框------------------------------------------------
const dialogDeleteAdmin = ref(false);

// 打开删除对话框
const deleteId = ref(0);
const openDialogDeleteAdmin = (id: number) => {
  dialogDeleteAdmin.value = true;
  deleteId.value = id;
};

// 删除管理员接口
const DeleteAdmin = async () => {
  try {
    const res = await changeAdmin({ id: deleteId.value, identity: "用户" });
    if (res.data.status === 0) {
      ElMessage.success("删除成功");
      cancelEdit();
      GetAdminList();
      dialogDeleteAdmin.value = false;
    } else {
      ElMessage.error("删除失败");
    }
  } catch (err: any) {
    ElMessage.error(err.message || "删除失败");
  }
};

// 添加表单 ref
const addFormRef = ref<FormInstance>();
const editFormRef = ref<FormInstance>();

// 取消添加，重置表单
const cancelAdd = () => {
  addFormRef.value?.resetFields();
  dialogAddAdmin.value = false;
};
</script>

<style scoped lang="css">
.global-content {
  padding: 8px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .table-wrapped {
    margin-top: 8px;
  }
}
</style>
