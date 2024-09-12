import http from '@/api'
import { ADMIN_MODULE } from '@/api/helper/prefix'
import type { IPage } from '@/api/interface'
import type { ISysTempFile } from '@/api/interface/system/sysTempFile'
import type { AxiosRequestConfig } from 'axios'

/**
 * 查询列表
 * @param params
 * @returns {*}
 */
export const getSysTempFileListApi = (params: ISysTempFile.Query) => {
  return http.get<IPage<ISysTempFile.Row>>(ADMIN_MODULE + `/sys-temp-file`, params)
}

/**
 * 添加
 * @param params
 * @returns {*}
 */
export const createSysTempFileApi = (params: ISysTempFile.Form) => {
  return http.post(ADMIN_MODULE + `/sys-temp-file`, params)
}

/**
 * 修改
 * @param params
 * @returns {*}
 */
export const updateSysTempFileApi = (params: ISysTempFile.Form) => {
  return http.put(ADMIN_MODULE + `/sys-temp-file`, params)
}

/**
 * 删除
 * @param params
 * @returns {*}
 */
export const removeSysTempFileApi = (params: { ids: number[] }) => {
  return http.delete(ADMIN_MODULE + `/sys-temp-file`, params)
}

/**
 * 获取详情
 * @param params
 * @returns {*}
 */
export const getSysTempFileDetailApi = (params: { id: number }) => {
  const { id } = params
  return http.get<ISysTempFile.Row>(ADMIN_MODULE + `/sys-temp-file/${id}`)
}

/**
 * 模版文件上传
 * @param params
 */
export const uploadTemplateFile = (params: FormData, options: AxiosRequestConfig = {}) => {
  return http.upload(ADMIN_MODULE + `/sys-temp-file/upload`, params, options)
}
