import { View, button, div, Env, required, type Pretty, type Typed, span, Snippet, SnippetTyped } from "@dlightjs/dlight"
import { EnvType } from "../../../App.view"
import { Navigator } from "@dlightjs/components"
import { css } from "@emotion/css"
import clsx from "clsx"
import { ChevronRightFilled } from "@dlightjs/material-icons"
import { HeaderData } from "../../../const/homeData"

interface ButtonProps {
  content: string
  className: string
  onClick: () => void
}

@View
class GetStarted implements EnvType {
  @Env theme: EnvType["theme"] = required
  @Env i18n: EnvType["i18n"] = required
  navigator = new Navigator()

  @Snippet
    Button = (({ content, className, onClick }: ButtonProps) => {
      button()
        .class(clsx(this.btnCss, className))
        .onClick(onClick)
      {
        div()
          .class(this.btnInnerCss)
        {
          span(content)
            .class(this.btnContentCss)
          ChevronRightFilled()
            .color(this.theme!.textColor)
            .height(30)
            .class(this.btnContentCss)
        }
      }
    }) as Pretty as SnippetTyped<ButtonProps>

  Body() {
    div()
      .class(this.wrapperCss)
    {
      this.Button(this.i18n!("Get Started", "快速开始"))
        .className(this.startCss)
        .onClick(() => { this.navigator.to(HeaderData[0].path) })
      this.Button(this.i18n!("Quick Example", "快速示例"))
        .className(this.exampleCss)
        .onClick(() => { this.navigator.to(HeaderData[1].path) })
    }
  }

  wrapperCss = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    gap: 10px;
  `

  btnCss = css`
    padding: 0 10px 0 17px;
    height: 38px;
    border-radius: 10px;
    cursor: pointer;
  `

  btnInnerCss = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
  `

  btnContentCss = css`
    height: 30px;
    line-height: 30px;
    color: ${this.theme!.textColor};
  `

  startCss = css`
    border-width: 0;
    background-color: ${this.theme!.activeColor};
  `

  exampleCss = css`
    box-sizing: border-box;
    border: 2px solid ${this.theme!.activeColor};
    background-color: ${this.theme!.bgColor};
  `
}

export default GetStarted as Pretty as Typed
