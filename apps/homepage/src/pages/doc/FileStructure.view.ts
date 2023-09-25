import { Prop, View } from "@dlightjs/dlight"
import { type Typed, Pretty } from "@dlightjs/types"
import { DocsStructureMap } from "../../utils/const"
import { DocsStructureMapType } from "../../utils/types"
import FileName from "./FileName.view"

interface FileStructureProps {
  structureData: DocsStructureMapType[]
}

@View
class FileStructure implements FileStructureProps {
  @Prop structureData = DocsStructureMap as any

  Body() {
    for (const { name, path, children } of this.structureData) {
      FileName()
        .name(name)
        .filePath(path)
        .children(children)
    }
  }
}

export default FileStructure as Pretty as Typed<FileStructureProps>
