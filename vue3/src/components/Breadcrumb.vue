<template>
    <div class="bread-crumb">
        <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item>{{ props.item.first }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.item.second">{{ props.item.second }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang='ts'>
import { ArrowRight } from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
.bread-crumb {
    background-color: #f3f4fb;
    padding: 0 20px;
    height: 30px;
    display: flex;
    align-items: center;
}
</style>