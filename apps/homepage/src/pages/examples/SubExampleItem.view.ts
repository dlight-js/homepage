import { View } from "@dlightjs/dlight"
import { type Typed, required, Prop, Env, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { CodeModuleType } from "../../utils/types"

interface SubExampleItemProps {
  title: string
  description: string
  modules: CodeModuleType[]
  updateModules: (modules: CodeModuleType[], title: string) => void
  selectedTitle: string
}

class SubExampleItem extends View implements SubExampleItemProps {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop title = required
  @Prop description = required
  @Prop modules = required
  @Prop updateModules = required
  @Prop selectedTitle = required

  isHover = false
  isSelected = this.selectedTitle === this.title

  Body() {
    div()
      .className(this.subExampleWrapCss)
      .onmouseenter(() => { this.isHover = true })
      .onmouseleave(() => { this.isHover = false })
      .onclick(() => {
        this.updateModules(this.modules, this.title)
      })
    {
      div(this.title)
        .className(this.exmapleSubTitleCss)
      div(this.description)
        .className(this.exmapleSubDecriptionCss)
    }
  }

  subExampleWrapCss = css`
    cursor: ${this.isSelected ? "default" : "pointer"};
    padding: 0 5px;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(97,126,68, 0.1);
    margin-bottom: 10px;
    color: ${this.isHover || this.isSelected ? this.theme.green9 : this.theme.green12};
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
