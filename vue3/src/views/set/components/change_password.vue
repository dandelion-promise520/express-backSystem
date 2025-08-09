<template>
    <!-- 修改密码弹框页面 -->
    <el-dialog v-model="statu.changePasswordDialog" title="修改密码" width="400px" draggable>
        <el-form :model="changePasswordForm" label-width="auto" label-position=top :rules="rules" style="width: 240px">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="changePasswordForm.oldPassword" placeholder="请输入您的旧密码" show-password type="password"
                    clearable />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="changePasswordForm.newPassword" placeholder="请输入您的新密码" show-password type="password"
                    clearable />
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input v-model="changePasswordForm.rePassword" placeholder="请再次输入您的新密码" show-password type="password"
                    clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="statu.changePasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="ChangePassword">
                    确认修改
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts' name="Change_password">
import { statu, rules, changePasswordForm, ChangePassword } from '../hooks/useChangePassword'
// 开启弹框按钮，传到index.vue
const openDialog = () => {
    statu.changePasswordDialog = true;
};
defineExpose({ openDialog });
</script>