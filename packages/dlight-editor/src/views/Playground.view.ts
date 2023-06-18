import DLight, { View, $, CustomNode } from "@dlightjs/dlight"
import { type Typed, Prop, RequiredProp, required, env, div } from "@dlightjs/types"
import ProjectEditor from "./Editor/ProjectEditor.view"
import PreviewView from "./Preview/Preview.view"
import { HStack } from "@dlightjs/components"
import { ToBeTransformedModule } from "../project/types"
import { colors, dividerWidth } from "../utils/const"
import HorizontalResizer from "./components/HorizontalResizer.view"
import { DLightProject } from "../project/dlightProject"
import { loadMonacoWorker } from "../playground/editor/loader"

loadMonacoWorker()

class Playground extends View {
  /** @project */
  @Prop modules: RequiredProp<ToBeTransformedModule[]> = required
  @Prop themeType: Prop<"light" | "dark"> = "light" as any
  @Prop width: Prop<string> = "100vw" as any
  @Prop height: Prop<string> = "100vh" as any
  @Prop onSave: Prop<(project: DLightProject) => void> = (() => {}) as any

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

  /** @member */
  wrapperEl?: HTMLDivElement

  Body() {
    env()
      .theme(this.theme)
      .themeType(this.themeType)
      .height(this.height)
    {
      div()
        ._backgroundColor(this.theme?.background)
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
            .onDrag($((x) => {
              const fullWidth = this.wrapperEl!.offsetWidth
              this.editorWidth = `${x / fullWidth * 100 + +this.editorWidth.slice(0, -1)}%`
              const editorWidth = +this.editorWidth.slice(0, -1)
              if (editorWidth < 20) {
                this.editorWidth = "20%"
              } else if (editorWidth > 80) {
                this.editorWidth = "80%"
              }
              this.previewWitth = `calc(${100 - +this.editorWidth.slice(0, -1)}% - ${dividerWidth}px)`
            }))
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

export default Playground as any as Typed<Playground>
