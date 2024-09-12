<template>
  <div class="table-box">
    <ProTable
      ref="proTableRef"
      title="模版文件管理"
      :indent="20"
      :columns="columns"
      :search-columns="searchColumns"
      :request-api="getTableList"
      row-key="id"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button
          type="primary"
          v-auth="'sys.temp.file.create'"
          :icon="CirclePlus"
          @click="openAddEdit('新增模版文件管理')"
        >
          新增
        </el-button>
        <el-button
          v-auth="'sys.temp.file.remove'"
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除
        </el-button>
      </template>
      <template #operation="{ row }">
        <el-button
          v-auth="'sys.temp.file.update'"
          type="primary"
          link
          :icon="EditPen"
          @click="openAddEdit('编辑模版文件管理', row, false)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="'sys.temp.file.remove'"
          type="primary"
          link
          :icon="Delete"
          @click="deleteInfo(row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <SysTempFileForm ref="sysTempFileRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CirclePlus, Delete, EditPen } from '@element-plus/icons-vue'
import ProTable from '@/components/ProTable/index.vue'
import {
  createSysTempFileApi,
  removeSysTempFileApi,
  updateSysTempFileApi,
  getSysTempFileListApi,
  getSysTempFileDetailApi
} from '@/api/modules/system/sysTempFile'
import { useHandleData } from '@/hooks/useHandleData'
import SysTempFileForm from '@/views/system/sysTempFile/components/SysTempFileForm.vue'
import type { ColumnProps, ProTableInstance, SearchProps } from '@/components/ProTable/interface'
import type { ISysTempFile } from '@/api/interface/system/sysTempFile'
defineOptions({
  name: 'SysTempFileView'
})
const proTableRef = ref<ProTableInstance>()
// 表格配置项
const columns: ColumnProps<ISysTempFile.Row>[] = [
  { type: 'selection', width: 80 },
  { prop: 'name', label: '模版名称' },
  { prop: 'permissions', label: '标识' },
  { prop: 'ext', label: '扩展类型' },
  { prop: 'path', label: '文件路径' },
  { prop: 'url', label: '文件地址' },
  { prop: 'operation', label: '操作', width: 250, fixed: 'right' }
]
// 搜索条件项
const searchColumns: SearchProps[] = [
  { prop: 'name', label: '模版名称', el: 'input' },
  { prop: 'permissions', label: '标识', el: 'input' }
]
// 获取table列表
const getTableList = (params: ISysTempFile.Query) => {
  let newParams = formatParams(params)
  return getSysTempFileListApi(newParams)
}
const formatParams = (params: ISysTempFile.Query) => {
  let newParams = JSON.parse(JSON.stringify(params))
  newParams.createTime && (newParams.createTimeStart = newParams.createTime[0])
  newParams.createTime && (newParams.createTimeEnd = newParams.createTime[1])
  delete newParams.createTime
  newParams.updateTime && (newParams.updateTimeStart = newParams.updateTime[0])
  newParams.updateTime && (newParams.updateTimeEnd = newParams.updateTime[1])
  delete newParams.updateTime
  return newParams
}
// 打开 drawer(新增、查看、编辑)
const sysTempFileRef = ref<InstanceType<typeof SysTempFileForm>>()
const openAddEdit = async (title: string, row: any = {}, isAdd = true) => {
  if (!isAdd) {
    const record = await getSysTempFileDetailApi({ id: row?.id })
    row = record?.data
  }
  const params = {
    title,
    row: { ...row },
    api: isAdd ? createSysTempFileApi : updateSysTempFileApi,
    getTableList: proTableRef.value?.getTableList
  }
  sysTempFileRef.value?.acceptParams(params)
}
// 删除信息
const deleteInfo = async (params: ISysTempFile.Row) => {
  await useHandleData(
    removeSysTempFileApi,
    { ids: [params.id] },
    `删除【${params.id}】模版文件管理`
  )
  proTableRef.value?.getTableList()
}
// 批量删除信息
const batchDelete = async (ids: string[]) => {
  await useHandleData(removeSysTempFileApi, { ids }, '删除所选模版文件管理')
  proTableRef.value?.clearSelection()
  proTableRef.value?.getTableList()
}
</script>
