<!-- EditorUserDialog.vue -->
<template>
    <el-dialog :title="title" width="500" draggable>
        <el-form :model="form" label-width="80px" :rules="rules">
            <el-form-item label="ID" prop="id">
                <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" disabled />
            </el-form-item>
            <slot name="form-items">
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
                        <el-option label="市场部" value="市场部"></el-option>
                        <el-option label="运营部" value="运营部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" />
                </el-form-item>
            </slot>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <slot name="cancel-button">
                    <el-button @click="handleCancel">取消</el-button>
                </slot>
                <slot name="confirm-button">
                    <el-button type="primary" @click="handleConfirm" :disabled="!isFormChanged">确认</el-button>
                </slot>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { rules } from '../hooks/useRules';
import { isEqual } from 'lodash-es';

// 获取表单值
const props = defineProps<{
    title: string;
    form: {
        id: number;
        account: string;
        name: string;
        sex: string;
        department: string;
        email: string;
        updateTime?: string;
        flag: boolean;
    };
}>();

// 定义取消时和确认时触发的事件
const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'confirm'): void;
}>();

// 取消按钮事件
const handleCancel = () => {
    emit('cancel');
};

// 确认按钮事件
const handleConfirm = () => {
    emit('confirm');
};

const originalForm = ref();
const isFormChanged = ref(false);

watch(
    () => props.form.flag,
    (newVal) => {
        if (newVal) {
            originalForm.value = { ...props.form };
        }
    }
);

watch(
    () => props.form,
    (newVal) => {
        if (originalForm.value) {
            isFormChanged.value = !isEqual(newVal, originalForm.value);

            // 如果 newVal 和 originalForm 一致，则将 isFormChanged 置为 false
            if (isEqual(newVal, originalForm.value)) {
                isFormChanged.value = false;
            }
        }
    },
    { deep: true }
);
</script>

<style>
/* 可以在这里添加样式 */
</style>
