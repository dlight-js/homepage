import { View } from "@dlightjs/dlight"
import { type Typed, div, Pretty, Prop, env, required, Watch, comp } from "@dlightjs/types"
import ProjectEditor from "./Editor/ProjectEditor.view"
import PreviewView from "./Preview/Preview.view"
import { ToBeTransformedModule } from "../project/types"
import { colors, dividerWidth } from "../utils/const"
import HorizontalResizer from "./components/HorizontalResizer.view"
import { DLightProject } from "../project/dlightProject"
import { loadMonacoWorker } from "../utils/loader"
import VerticalResizer from "./components/VerticalResizer.view"
import { css } from "@iandx/easy-css"

loadMonacoWorker()

interface PlaygroundProps {
  modules: ToBeTransformedModule[]
  themeType?: "light" | "dark"
  width?: string
  height?: string
  onSave?: (project: DLightProject) => void
  isVertical?: boolean
}

@View
class Playground implements PlaygroundProps {
  /** @project */
  @Prop modules: ToBeTransformedModule[] = required
  @Prop themeType: "light" | "dark" = "light" as any
  @Prop width = "100vw" as any
  @Prop height = "100vh" as any
  @Prop onSave?: (project: DLightProject) => void
  @Prop isVertical: boolean = false

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

  srcDoc = ""
  getSrcDoc = (doc: string) => {
    this.srcDoc = doc
  }

  refreshFunc = () => {}
  getRefreshFunc = (func: any) => {
    this.refreshFunc = func
  }

  clearConsoleFunc = () => {}
  getClearConsoleFunc = (func: any) => {
    this.clearConsoleFunc = func
  }

  verticalEditorWidth = "100%"
  horizontalEditorWidth = "50%"

  verticalPreviewWidth = "100%"
  horizontalPreviewWidth = `calc(50% - ${dividerWidth}px)`

  editorWidth = this.isVertical ? this.verticalEditorWidth : this.horizontalEditorWidth
  previewWidth = this.isVertical ? this.verticalPreviewWidth : this.horizontalPreviewWidth

  verticalEditorHeight = "50%"
  horizontalEditorHeight = "100%"

  verticalPreviewHeight = `calc(50% - ${dividerWidth}px)`
  horizontalPreviewHeight = "100%"

  editorHeight = this.isVertical ? this.verticalEditorHeight : this.horizontalEditorHeight
  previewHeight = this.isVertical ? this.verticalPreviewHeight : this.horizontalPreviewHeight

  /** @method */
  handleHorizontalResizerDrag(x: number) {
    const fullWidth = this.wrapperEl!.offsetWidth
    this.editorWidth = `${x / fullWidth * 100 + +this.editorWidth.slice(0, -1)}%`
    const editorWidth = +this.editorWidth.slice(0, -1)
    if (editorWidth < 20) {
      this.editorWidth = "20%"
    } else if (editorWidth > 80) {
      this.editorWidth = "80%"
    }
    this.previewWidth = `calc(${100 - +this.editorWidth.slice(0, -1)}% - ${dividerWidth}px)`
  }

  handleVerticalResizerDrag(x: number, y: number) {
    const fullHeight = this.wrapperEl!.offsetHeight
    this.editorHeight = `${y / fullHeight * 100 + +this.editorHeight.slice(0, -1)}%`
    const editorHeight = +this.editorHeight.slice(0, -1)
    if (editorHeight < 20) {
      this.editorHeight = "20%"
    } else if (editorHeight > 80) {
      this.editorHeight = "80%"
    }
    this.previewHeight = `calc(${100 - +this.editorHeight.slice(0, -1)}% - ${dividerWidth}px)`
  }

  /** @member */
  wrapperEl?: HTMLDivElement
  // stack = this.isVertical ? VStack : HStack

  View() {
    env()
      .theme(this.theme)
      .themeType(this.themeType)
      .height(this.height)
      .srcDoc(this.srcDoc)
      .getClearConsoleFunc(this.getClearConsoleFunc)
    {
      div()
        .style({
          backgroundColor: this.theme?.background
        })
        .element(this.wrapperEl)
      {
        div()
          .class(this.isVertical ? this.columnDisplayCss : this.rowDisplayCss)
        {
          ProjectEditor()
            .width(this.editorWidth)
            .height(this.editorHeight)
            .modules(this.modules)
            .getMountId(this.getMountId)
            .getCurrTransformedCode(this.getCurrTransformedCode)
            .getRefreshFunc(this.getRefreshFunc)
            .getSrcDoc(this.getSrcDoc)
            .onSave(this.onSave)
            .clearConsoleFunc(this.clearConsoleFunc)
          comp(this.isVertical ? VerticalResizer : HorizontalResizer)()
            .width(`${this.width}`)
            .height(`${this.height}`)
            .onDrag(this.isVertical ? this.handleVerticalResizerDrag.bind(this) : this.handleHorizontalResizerDrag.bind(this))
          PreviewView()
            .width(this.previewWidth)
            .verticalHeight(this.previewHeight)
            .mountId(this.mountId)
            .currTransformedCode(this.currTransformedCode)
            .refreshFunc(this.refreshFunc)
        }
      }
    }
  }

  columnDisplayCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${this.width};
    height: ${this.height};
  `

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${this.width};
    height: ${this.height};
  `
}

export default Playground as Pretty as Typed<PlaygroundProps>
