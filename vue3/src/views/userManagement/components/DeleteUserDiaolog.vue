<template>
    <!-- 删除对话框 -->
    <el-dialog v-model="dialogVisible" :title="`删除${props.item}管理员`" width="500" draggable>
        <p>确定要删除该{{ props.item }}吗？</p>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';

const props = defineProps<{
    item: string;
    visible: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'confirm'): void;
}>();

const dialogVisible = ref(props.visible);

watch(
    () => props.visible,
    (newVal) => {
        dialogVisible.value = newVal;
    }
);

watch(
    () => dialogVisible.value,
    (newVal) => {
        emit('update:visible', newVal);
    }
);

const cancel = () => {
    dialogVisible.value = false;
    emit('confirm'); // 这里假设需要在取消时也触发确认事件，可以根据实际需求调整
};

const confirm = () => {
    dialogVisible.value = false;
    emit('confirm');
};
</script>

<style></style>
