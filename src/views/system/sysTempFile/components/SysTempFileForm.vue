<template>
  <el-dialog
    v-model="visible"
    :title="`${paramsProps.title}`"
    :destroy-on-close="true"
    width="580px"
    draggable
  >
    <el-form
      ref="ruleFormRef"
      label-width="140px"
      label-suffix=" :"
      :rules="rules"
      :model="paramsProps.row"
      @submit.enter.prevent="handleSubmit"
    >
      <el-form-item label="模版名称" prop="name">
        <el-input v-model="paramsProps.row.name" placeholder="请填写模版名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="permissions">
        <el-input
          v-model="paramsProps.row.permissions"
          placeholder="请填写标识"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="模版上传" prop="url">
        <SimplifyUpload
            dir="template"
            :name="'教师统计模版文件.xlsx'"
            :limit="1"
            :drag="false"
            :is-append-time="false"
            v-model="paramsProps.row.url"
        ></SimplifyUpload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false"> 取消</el-button>
      <el-button type="primary" @click="handleSubmit"> 确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  type ElForm,
  ElMessage
} from 'element-plus'
import SimplifyUpload from "@/components/SimplifyUpload/index.vue";

defineOptions({
  name: 'SysTempFileForm'
})
const rules = reactive({
  name: [{ required: true, message: '请填写模版名称' }],
  permissions: [{ required: true, message: '请填写标识' }]
})

const visible = ref(false)
const paramsProps = ref<View.DefaultParams>({
  title: '',
  row: {},
  api: undefined,
  getTableList: undefined
})

// 接收父组件传过来的参数
const acceptParams = (params: View.DefaultParams) => {
  paramsProps.value = params
  visible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await paramsProps.value.api!(paramsProps.value.row)
      ElMessage.success({ message: `${paramsProps.value.title}成功！` })
      paramsProps.value.getTableList!()
      visible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams
})
</script>

<style scoped lang="scss"></style>
