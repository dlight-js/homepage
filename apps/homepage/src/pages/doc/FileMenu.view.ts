import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, Prop, required } from "@dlightjs/types"
import { DocsStructureMapType } from "../../utils/types"
import FileMenuItem from "./FileMenuItem.view"

interface FileMenuProps {
  structureData: DocsStructureMapType[]
}

@View
class FileMenu implements FileMenuProps {
  @Prop structureData = required

  View() {
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
