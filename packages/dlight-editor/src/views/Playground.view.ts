import { Prop, View, env, required } from "@dlightjs/dlight"
import { type Typed, div, Pretty } from "@dlightjs/types"
import ProjectEditor from "./Editor/ProjectEditor.view"
import PreviewView from "./Preview/Preview.view"
import { HStack, VStack } from "@dlightjs/components"
import { ToBeTransformedModule } from "../project/types"
import { colors, dividerWidth } from "../utils/const"
import HorizontalResizer from "./components/HorizontalResizer.view"
import { DLightProject } from "../project/dlightProject"
import { loadMonacoWorker } from "../utils/loader"
import VerticalResizer from "./components/VerticalResizer.view"

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

  refreshFunc = () => {}
  getRefreshFunc = (func: any) => {
    this.refreshFunc = func
  }

  verticalEditorWidth = "100%"
  horizontalEditorWidth = "50%"

  verticalPreviewWidth = "100%"
  horizontalPreviewWidth = `calc(50% - ${dividerWidth}px)`

  editorWidth = this.isVertical ? this.verticalEditorWidth : this.horizontalEditorWidth
  previewWidth = this.isVertical ? this.verticalPreviewWidth : this.horizontalPreviewWidth

  verticalEditorHeight = "50%"
  horizontalEditorHeight = "100%"

  verticalPreviewHeight = "50%"
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
        if (this.isVertical) {
          VStack()
            .width(this.width)
            .height(this.height)
            .spacing(0)
          {
            ProjectEditor()
              .width(this.editorWidth)
              .height(this.editorHeight)
              .modules(this.modules)
              .getMountId(this.getMountId)
              .getCurrTransformedCode(this.getCurrTransformedCode)
              .getRefreshFunc(this.getRefreshFunc)
              .onSave(this.onSave)
            VerticalResizer()
              .width(`${this.width}`)
              .onDrag(this.handleVerticalResizerDrag.bind(this))
            PreviewView()
              .width(this.previewWidth)
              .verticalHeight(this.previewHeight)
              .mountId(this.mountId)
              .currTransformedCode(this.currTransformedCode)
              .refreshFunc(this.refreshFunc)
          }
        } else {
          HStack()
            .width(this.width)
            .height(this.height)
            .spacing(0)
          {
            ProjectEditor()
              .width(this.editorWidth)
              .height(this.editorHeight)
              .modules(this.modules)
              .getMountId(this.getMountId)
              .getCurrTransformedCode(this.getCurrTransformedCode)
              .getRefreshFunc(this.getRefreshFunc)
              .onSave(this.onSave)
            HorizontalResizer()
              .height(`${this.height}`)
              .onDrag(this.handleHorizontalResizerDrag.bind(this))
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
  }
}

export default Playground as Pretty as Typed<PlaygroundProps>
