import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div, Env, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { CodeModuleType } from "../../utils/types"
import { Navigator } from "@dlightjs/components"

interface SubExampleItemProps {
  title: string
  description: string
  modules: CodeModuleType[]
  updateModules: (modules: CodeModuleType[], title: string, header: string) => void
  selectedTitle: string
  header: string
}

@View
class SubExampleItem implements SubExampleItemProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env path: string = required
  @Prop title = required
  @Prop description = required
  @Prop modules = required
  @Prop updateModules = required
  @Prop selectedTitle = required
  @Prop header = ""
  mutatedTitle = this.title.toLocaleLowerCase().replaceAll(" ", "-")

  isHover = false
  isSelected = this.selectedTitle === this.title

  View() {
    div()
      .id(this.mutatedTitle)
      .class(this.subExampleWrapCss)
      .onMouseEnter(() => { this.isHover = true })
      .onMouseLeave(() => { this.isHover = false })
      .onClick(() => {
        this.updateModules(this.modules, this.title, this.header)
      })
    {
      div(this.title)
        .class(this.exmapleSubTitleCss)
      div(this.description)
        .class(this.exmapleSubDecriptionCss)
    }
  }

  subExampleWrapCss = css`
    cursor: ${this.isSelected ? "default" : "pointer"};
    padding: 0 5px;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(97,126,68, 0.1);
    margin-bottom: 10px;
    color: ${this.isHover || this.isSelected ? this.theme.exampleMenuBtnHover : this.theme.exampleMenuBtnTextColor};
  `

  exmapleSubTitleCss = css`
    padding-bottom: 10px;
    font-weight: ${this.isHover || this.isSelected ? 500 : ""};
  `

  exmapleSubDecriptionCss = css`
    font-size: 12px;
    line-height: 20px;
  `
}

export default SubExampleItem as Pretty as Typed<SubExampleItemProps>
