import { View } from "@dlightjs/dlight"
import { type Typed, Prop, required, env, div, Pretty } from "@dlightjs/types"
import ProjectEditor from "./Editor/ProjectEditor.view"
import PreviewView from "./Preview/Preview.view"
import { HStack } from "@dlightjs/components"
import { ToBeTransformedModule } from "../project/types"
import { colors, dividerWidth } from "../utils/const"
import HorizontalResizer from "./components/HorizontalResizer.view"
import { DLightProject } from "../project/dlightProject"
import { loadMonacoWorker } from "../utils/loader"

loadMonacoWorker()

interface PlaygroundProps {
  modules: ToBeTransformedModule[]
  themeType?: "light" | "dark"
  width?: string
  height?: string
  onSave?: (project: DLightProject) => void
}

class Playground extends View implements PlaygroundProps {
  /** @project */
  @Prop modules: ToBeTransformedModule[] = required
  @Prop themeType: "light" | "dark" = "light" as any
  @Prop width = "100vw" as any
  @Prop height = "100vh" as any
  @Prop onSave?: (project: DLightProject) => void

  /** @reactive */
  theme = colors[this.themeType]
  mountId = ""
  getMountId = (id: string) => {
    this.mountId = id
  }

  currTransformedCode = ""
  getCurrTransformedCode = (code: any) => {
    this.currTransformedCode = code
  }

  refreshFunc = () => {}
  getRefreshFunc = (func: any) => {
    this.refreshFunc = func
  }

  editorWidth = "50%"
  previewWitth = `calc(50% - ${dividerWidth}px)`

  /** @method */
  handleRedizerDrag(x: number) {
    const fullWidth = this.wrapperEl!.offsetWidth
    this.editorWidth = `${x / fullWidth * 100 + +this.editorWidth.slice(0, -1)}%`
    const editorWidth = +this.editorWidth.slice(0, -1)
    if (editorWidth < 20) {
      this.editorWidth = "20%"
    } else if (editorWidth > 80) {
      this.editorWidth = "80%"
    }
    this.previewWitth = `calc(${100 - +this.editorWidth.slice(0, -1)}% - ${dividerWidth}px)`
  }

  /** @member */
  wrapperEl?: HTMLDivElement

  Body() {
    env()
      .theme(this.theme)
      .themeType(this.themeType)
      .height(this.height)
    {
      div()
        .style({
          backgroundColor: this.theme?.background
        })
        .element(this.wrapperEl)
      {
        HStack()
          .width(this.width)
          .height(this.height)
          .spacing(0)
        {
          ProjectEditor()
            .width(this.editorWidth)
            .modules(this.modules)
            .getMountId(this.getMountId)
            .getCurrTransformedCode(this.getCurrTransformedCode)
            .getRefreshFunc(this.getRefreshFunc)
            .onSave(this.onSave)
          HorizontalResizer()
            .height(`${this.height}`)
            .onDrag(this.handleRedizerDrag.bind(this))
          PreviewView()
            .width(this.previewWitth)
            .mountId(this.mountId)
            .currTransformedCode(this.currTransformedCode)
            .refreshFunc(this.refreshFunc)
        }
      }
    }
  }
}

export default Playground as Pretty as Typed<PlaygroundProps>
