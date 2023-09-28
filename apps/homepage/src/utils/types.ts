export interface DocsStructureMapType {
  name: string
  path: string
  children?: DocsStructureMapType[]
}

export interface CodeModuleType {
  code: string
  path: string
}

export interface ExmaplesCodeDataType {
  title: string
  description: string
  children?: ExmaplesCodeDataType[]
  modules?: CodeModuleType[]
}
