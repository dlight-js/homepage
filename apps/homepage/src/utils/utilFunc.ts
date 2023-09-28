import { DocsStructureMapType } from "./types"

export function initMap(mapData: any, basePath: string) {
  const newMapData = mapData.map(({ name, path, children }: any) => {
    if (children) {
      return {
        name,
        path: `${basePath}/${path}`,
        children: initMap(children, `${basePath}/${path}`)
      }
    } else {
      return {
        name,
        path: `${basePath}/${path}`
      }
    }
  }
  )
  return newMapData
}

export function flatFileStructureData(mapData: any) {
  const flatMapData: DocsStructureMapType[] = []
  mapData.forEach(({ name, path, children }: any) => {
    flatMapData.push({ name, path, children })
    if (children) {
      flatMapData.push(...flatFileStructureData(children))
    }
  }
  )
  return flatMapData
}

export function findCertainFile({ mapData, filePath, fileName }: { mapData: DocsStructureMapType[], filePath?: string, fileName?: string }) {
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

export function getSize(value: number) {
  if (isMobile) {
    return Math.ceil(value / 1100 * window.innerWidth * 2) + "px"
  }
  return value + "px"
}
