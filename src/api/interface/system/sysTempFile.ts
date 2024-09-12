import type { IPageQuery } from '@/api/interface'

export namespace ISysTempFile {
  // 查询条件
  export interface Query extends IPageQuery {
    name?: string
    permissions?: string
  }

  // 编辑form表单
  export interface Form {
    id?: number
    name?: string
    permissions?: string
    ext?: string
    path?: string
    url?: string
  }

  // list或detail返回结构
  export interface Row {
    id?: number
    name?: string
    permissions?: string
    ext?: string
    path?: string
    url?: string
  }
}
