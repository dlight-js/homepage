import { View, type Typed, Pretty, Prop, required } from "@dlightjs/dlight"
import { DocsStructureMapType } from "../../utils/types"
import FileMenuItem from "./FileMenuItem.view"

interface FileMenuProps {
  structureData: DocsStructureMapType[]
}

@View
class FileMenu implements FileMenuProps {
  @Prop structureData = required

  Body() {
    if (this.structureData) {
      for (const { name, zhName, path, children } of this.structureData) {
        FileMenuItem()
          .name(name)
          .zhName(zhName)
          .filePath(path)
          .children(children)
      }
    }
  }
}

export default FileMenu as Pretty as Typed<FileMenuProps>
