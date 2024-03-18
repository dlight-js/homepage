import { View, type Typed, Pretty, div, Env, Prop, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import SubExampleItem from "./SubExampleItem.view"
import { Navigator } from "@dlightjs/components"
import { ExmaplesCodeDataType } from "../../utils/types"

interface ExampleMenuProps {
  isOpen: boolean
  selectedTitle: string
  examples: ExmaplesCodeDataType[]
}

@View
class ExampleMenu implements ExampleMenuProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env windowWidth = required
  @Env i18n: any = required
  @Prop isOpen = required
  @Prop examples = required
  @Prop selectedTitle = required
  @Prop header = required

  Body() {
    div()
      .class(this.examplesListWrapCss)
    {
      for (const example of this.examples) {
        div(this.i18n(example.title, example.zhName))
          .class(this.exampleTitleCss)
        for (const { title, zhName, description, zhDescription } of example.children) {
          SubExampleItem()
            .header(example.title)
            .title(title)
            .zhName(zhName)
            .description(description)
            .zhDescription(zhDescription)
            .selectedTitle(this.selectedTitle)
        }
      }
    }
  }

  examplesListWrapCss = css`
    width: 240px;
    height: calc(100vh - 100px);
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 4px;
    padding: 20px 10px;
    margin-top: ${this.isOpen ? "-52px" : "0px"};
    line-height: 30px;
    overflow: scroll;
    background-color: ${this.theme.bgColor};
    box-shadow: ${this.isOpen ? "0 2px 8px 0 #A9A9A9" : ""};
  `

  exampleTitleCss = css`
    font-size: 28px;
    color: ${this.theme.textColor};
    cursor: default;
    padding-bottom: 15px;
    border-bottom: solid 1px rgba(97,126,68, 0.3);
    margin-bottom: 10px;
  `
}

export default ExampleMenu as Pretty as Typed<ExampleMenuProps>
