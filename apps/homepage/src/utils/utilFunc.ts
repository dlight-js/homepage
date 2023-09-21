import { DocsStructureMapType } from "./types"

export function initMap(mapData: any, basePath: string) {
  const newMapData = mapData.map(({ name, path, children }: any, index: number) => {
    if (children) {
      return {
        name,
        path: `${basePath}/${path}`,
        children: initMap(children, `${basePath}/${path}`),
        prev: index === 0 ? undefined : mapData[index - 1],
        next: children[0]
      }
    } else {
      return {
        name,
        path: `${basePath}/${path}`,
        prev: index === 0 ? undefined : mapData[index - 1],
        next: mapData[index + 1]
      }
    }
  }
  )
  return newMapData
}

export function getPrevNext(mapData: any) {
  const newMapData = mapData.map(({ name, path, children }: any, index: number) => {
    if (children) {
      return {
        name,
        path,
        children: getPrevNext(children),
        prev: index === 0 ? undefined : mapData[index - 1].children ? mapData[index - 1].children[mapData[index - 1].children.length - 1] : mapData[index - 1],
        next: getPrevNext(children)[0]
      }
    } else {
      return {
        name,
        path,
        prev: index === 0 ? undefined : mapData[index - 1].children ? mapData[index - 1].children[mapData[index - 1].children.length - 1] : mapData[index - 1],
        next: mapData[index + 1]
      }
    }
  }
  )
  return newMapData
}

export function findCertainFile({ mapData, filePath, fileName }: { mapData: DocsStructureMapType[], filePath?: string, fileName?: string }) {
  let res: DocsStructureMapType | undefined
  mapData.forEach((item: DocsStructureMapType) => {
    if (fileName && fileName === item?.name) {
      res = item
      return
    }
    if (filePath && filePath === item?.path) {
      res = item
      return
    }
    if (!res && item.children) {
      res = findCertainFile({ mapData: item.children, filePath, fileName })
    }
  })
  return res
}
