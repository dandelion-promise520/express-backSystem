<template>
    <el-dialog v-model="dialogFormVisible" title="" width="700">
        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 490px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="ChangeCompanyIntroduce">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { bus } from '@/utils/mitt';
import { changeCompanyIntroduce, getAllCompanyIntroduce } from '@/api/setting'
import { ElMessage } from 'element-plus';

// 对话框数据
const dialogFormVisible = ref(false)

// 对话框方法  传递参数，根据参数判断里面的内容
bus.on('sendValueId', async (value) => {
    localStorage.setItem('value', value as string || '')
    // console.log(value);
    if (value == 8) {
        valueHtml.value = (await getAllCompanyIntroduce()).data.results[1].set_text || ''
    } else if (value == 9) {
        valueHtml.value = (await getAllCompanyIntroduce()).data.results[2].set_text || ''
    } else if (value == 10) {
        valueHtml.value = (await getAllCompanyIntroduce()).data.results[3].set_text || ''
    } else if (value == 11) {
        valueHtml.value = (await getAllCompanyIntroduce()).data.results[4].set_text || ''
    }
    dialogFormVisible.value = true
})

const ChangeCompanyIntroduce = async () => {
    // console.log(valueHtml.value);
    const value = +(localStorage.getItem('value')!) || 0
    const res = await changeCompanyIntroduce(valueHtml.value, value)
    ElMessage({
        message: res.data.message,
        type: "success",
    });
    dialogFormVisible.value = false
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

const mode = ref('default')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    localStorage.removeItem('value')
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: string) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style lang="scss" scoped></style>