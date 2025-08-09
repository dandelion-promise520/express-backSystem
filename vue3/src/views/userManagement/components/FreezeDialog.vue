<template>
    <el-dialog v-model="dialogVisible" :title="isFreeze ? '冻结用户' : '解冻用户'" width="500">
        <span>您确认{{ isFreeze ? '冻结' : '解冻' }}此账号吗？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    isFreeze: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const handleCancel = () => {
    dialogVisible.value = false;
};

const handleConfirm = () => {
    emit('confirm');
    dialogVisible.value = false;
};
</script>
