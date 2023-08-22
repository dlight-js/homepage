import { View } from "@dlightjs/dlight"
import { type Typed, Prop } from "@dlightjs/types"
import { DocsStructureMap } from "../../utils/const"
import FileName from "./FileName.view"
import { DocsStructureMapType } from "../../utils/types"

class FileStructure extends View {
  @Prop structureData: Prop<DocsStructureMapType[]> = DocsStructureMap as any

  Body() {
    for (const { name, path, children } of this.structureData) {
      FileName()
        .name(name)
        .filePath(path)
        .children(children)
    }
  }
}

export default FileStructure as any as Typed<FileStructure>
