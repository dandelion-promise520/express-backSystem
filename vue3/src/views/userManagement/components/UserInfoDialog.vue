<template>
  <el-dialog
    title="用户信息"
    width="450px"
    center
    draggable
    style="height: 300px"
  >
    <div class="user-info-wrapped">
      <div class="user-info-content">
        <div class="avatar-placeholder">
          <img
            v-if="userInfo.image_url"
            :src="userInfo.image_url"
            height="100%"
          />
        </div>
        <div class="info">
          <div class="info-item">帐号：{{ userInfo.account }}</div>
          <div class="info-item">姓名：{{ userInfo.name }}</div>
          <div class="info-item">性别：{{ userInfo.sex }}</div>
          <div class="info-item">部门：{{ userInfo.department }}</div>
          <div class="info-item">邮箱：{{ userInfo.email }}</div>
          <div class="info-item">状态：{{ formattedStatus }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editUser">编辑</el-button>
        <el-button @click="assignRole">赋权</el-button>
        <el-button type="danger" @click="deleteUser">删除用户</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{
  userInfo: {
    account: string;
    name: string;
    sex: string;
    department: string;
    email: string;
    status: string;
    image_url?: string;
  };
}>();

const emit = defineEmits<{
  (e: "edit-user"): void;
  (e: "assign-role"): void;
  (e: "delete-user"): void;
}>();

const formattedStatus = computed(() => {
  return props.userInfo.status === "0" ? "正常" : "冻结";
});

const editUser = () => {
  emit("edit-user");
};

const deleteUser = () => {
  emit("delete-user");
};

const assignRole = () => {
  emit("assign-role");
};
</script>

<style scoped lang="css">
.user-info-wrapped {
  display: flex;
  flex-direction: column;
  width: 100%;

  .user-info-content {
    display: flex;
    align-items: center;

    .avatar-placeholder {
      width: 100px;
      height: 100px;
      margin-right: 36px;
      background-color: #c0c4cc;
    }

    .info {
      display: flex;
      flex-direction: column;
      line-height: 30px;
    }

    .info-item {
      display: flex;
      align-items: center;
    }

    .info-value {
      margin-left: 10px;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
