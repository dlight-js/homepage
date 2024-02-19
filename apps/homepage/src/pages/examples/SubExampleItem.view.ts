import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div, Env, Prop, required } from "@dlightjs/types"
import { css } from "@emotion/css"
import { Navigator } from "@dlightjs/components"

interface SubExampleItemProps {
  title: string
  description: string
  selectedTitle: string
  header: string
  zhName: string
  zhDescription: string
}

@View
class SubExampleItem implements SubExampleItemProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env path: string = required
  @Env i18n: any = required
  @Prop title = required
  @Prop zhName = required
  @Prop zhDescription = required
  @Prop description = required
  @Prop selectedTitle = required
  @Prop header = required
  mutatedPath = `${this.header.toLocaleLowerCase().replaceAll(" ", "-")}/${this.title.toLocaleLowerCase().replaceAll(" ", "-")}`

  isHover = false
  isSelected = this.selectedTitle === this.title

  View() {
    div()
      .id(this.mutatedPath)
      .class(this.subExampleWrapCss)
      .onMouseEnter(() => { this.isHover = true })
      .onMouseLeave(() => { this.isHover = false })
      .onClick(() => {
        this.navigator.to(`/examples/${this.mutatedPath}`)
      })
    {
      div(this.i18n(this.title, this.zhName))
        .class(this.exampleSubTitleCss)
      div(this.i18n(this.description, this.zhDescription))
        .class(this.exampleSubDescriptionCss)
    }
  }

  subExampleWrapCss = css`
    cursor: ${this.isSelected ? "default" : "pointer"};
    padding: 0 5px;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(97,126,68, 0.1);
    margin-bottom: 10px;
    color: ${this.isHover || this.isSelected ? this.theme.highlightColor : this.theme.textColor};
  `

  exampleSubTitleCss = css`
    padding-bottom: 10px;
    font-weight: ${this.isHover || this.isSelected ? 500 : ""};
  `

  exampleSubDescriptionCss = css`
    font-size: 12px;
    line-height: 20px;
  `
}

export default SubExampleItem as Pretty as Typed<SubExampleItemProps>
