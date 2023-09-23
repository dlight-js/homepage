import { View } from "@dlightjs/dlight"
import { css } from "@dlightjs/easy-css"
import { type Typed, div, Env, required, Prop } from "@dlightjs/types"
import Header from "../home/Header.view"
import DLightEditor from "dlight-editor"
import { ExamplesCodeData } from "../../utils/const"
import { CodeModuleType, ExmaplesCodeDataType } from "../../utils/types"
import SubExampleItem from "./SubExampleItem.view"

class NewPlayGround extends View {
  @Prop modules: any
  @Env themeType: "light" | "dark" = required
  a = true
  onChange = (() => {
    if (this.modules) {
      this.a = !this.a
    }
  })()

  Body() {
    if (this.a) {
      DLightEditor()
        .modules(this.modules)
        .height("75vh")
        .width("70vw")
        .themeType(this.themeType)
    } else {
      DLightEditor()
        .modules(this.modules)
        .height("75vh")
        .width("70vw")
        .themeType(this.themeType)
    }
  }
}

class ExamplesPage extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Env themeType: "light" | "dark" = required
  examples: ExmaplesCodeDataType[] = ExamplesCodeData
  modules: any = this.examples[0].children[0].modules
  selectedTitle: string = this.examples[0].children[0].title

  updateModules(modules: CodeModuleType[], title: string) {
    this.modules = modules
    this.selectedTitle = title
    this.navigator.to(`/examples/${title.toLocaleLowerCase().replaceAll(" ", "-")}`)
  }

  Body() {
    Header()
      .isNeedAnimation(false)
    div()
      .className(this.exmaplesPageWrapCss)
    {
      div()
        .className(this.examplesListWrapCss)
      {
        for (const example of this.examples) {
          div(example.title)
            .className(this.exmapleTitleCss)
          for (const { title, description, modules } of example.children) {
            SubExampleItem()
              .title(title)
              .description(description)
              .modules(modules)
              .updateModules(this.updateModules)
              .selectedTitle(this.selectedTitle)
          }
        }
      }
      div()
        .className(this.dlightEditorWrapCss)
      {
        NewPlayGround()
          .modules(this.modules)
      }
    }
  }

  exmaplesPageWrapCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 60px;
    background-color: ${this.theme.orange1};
    height: 89vh;
  `

  dlightEditorWrapCss = css`
    margin-left: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px -3px #A9A9A9;
    overflow: hidden;
  `

  examplesListWrapCss = css`
    width: 30%;
    max-width: 240px;
    min-width: 180px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    /* border: solid 1px rgba(97,126,68, 0.3); */
    border-radius: 4px;
    padding: 20px 10px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 30px;
    height: 70vh;
    overflow: scroll;
    box-shadow: 0 0 6px -3px #A9A9A9;
    background-color: ${this.theme.orange2};
  `

  exmapleTitleCss = css`
    font-size: 28px;
    color: ${this.theme.green10};
    cursor: default;
    padding-bottom: 15px;
    border-bottom: solid 1px rgba(97,126,68, 0.3);
    margin-bottom: 10px;
  `
}

export default ExamplesPage as any as Typed<ExamplesPage>
