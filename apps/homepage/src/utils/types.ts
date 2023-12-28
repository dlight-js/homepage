export interface DocsStructureMapType {
  name: string
  zhName: string
  path: string
  children?: DocsStructureMapType[]
}

export interface CodeModuleType {
  code: string
  path: string
}

export interface ExmaplesCodeDataType {
  title: string
  zhName?: string
  path?: string
  description: string
  children?: ExmaplesCodeDataType[]
  modules?: CodeModuleType[]
}
