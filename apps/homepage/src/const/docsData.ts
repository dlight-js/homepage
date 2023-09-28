import { DocsStructureMapType } from "../utils/types"
import { initMap } from "../utils/utilFunc"
import DocsStructureMapJson from "../pages/doc/structure/documentsStructure.json"
import EcosStructureMapJson from "../pages/doc/structure/ecosystemStructure.json"

export const DocsStructureMap: DocsStructureMapType[] = initMap(DocsStructureMapJson, "/docs")

export const EcosStructureMap: DocsStructureMapType[] = initMap(EcosStructureMapJson, "/ecosystem")

export const FileMap = {
  ecosystem: EcosStructureMap,
  docs: DocsStructureMap
}
