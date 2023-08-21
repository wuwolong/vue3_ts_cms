// import { IRootState } from './type'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenus: any[]
}

import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'
import { IAnalysisState } from './main/analysis/type'
interface IRootWithModule {
  loginModule: ILoginState
  system: ISystemState
  analysis: IAnalysisState
}
export type IStoreType = IRootState & IRootWithModule
