export interface DocsStructureMapType {
  name: string
  path: string
  children?: DocsStructureMapType[]
  prev: DocsStructureMapType | undefined
  next: DocsStructureMapType | undefined
}
