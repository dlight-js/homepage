import { DocsStructureMapType } from "./types"

export function initMap(mapData: any, basePath: string) {
  const newMapData = mapData.map((item: any) => {
    if (item.children) {
      return {
        ...item,
        ...item,
        path: `${basePath}/${item.path}`,
        children: initMap(item.children, `${basePath}/${item.path}`)
      }
    } else {
      return {
        ...item,
        path: `${basePath}/${item.path}`
      }
    }
  }
  )
  return newMapData
}

export function flatFileStructureData(mapData: any) {
  if (!mapData) return []
  const flatMapData: DocsStructureMapType[] = []
  mapData?.forEach((item: any) => {
    flatMapData.push(item)
    if (item.children) {
      flatMapData.push(...flatFileStructureData(item.children))
    }
  }
  )
  return flatMapData
}

export function findCertainFile({ mapData, filePath, fileName }: { mapData: DocsStructureMapType[], filePath?: string, fileName?: string }): [DocsStructureMapType | undefined, number | undefined] {
  let res: DocsStructureMapType | undefined
  let resIndex: number | undefined
  mapData.forEach((item: DocsStructureMapType, index: number) => {
    if (fileName && fileName === item?.name) {
      res = item
      resIndex = index
      return
    }
    if (filePath && filePath === item?.path) {
      res = item
      resIndex = index
      return
    }
    if (!res && item.children) {
      [res] = findCertainFile({ mapData: item.children, filePath, fileName })
    }
  })
  return [res, resIndex]
}

const isMobile = /Android|iPhone/i.test(window.navigator.userAgent)

export function getSize(value: number, scale = 1100) {
  if (isMobile) {
    return Math.ceil(value / scale * window.innerWidth * 2) + "px"
  }
  return value + "px"
}
