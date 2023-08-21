export interface ISystemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: 0
  queryInfo: any
}
//修改增加的类型
export interface IqueryInfoType {
  pageName: string
  editData?: any
  createData?: any
  id?: number
}
