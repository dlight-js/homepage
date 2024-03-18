import { View, Content, required, type Pretty, type Typed, div, Env, ContentProp, SnippetTyped, Snippet } from "@dlightjs/dlight"
import { ArrowRightFilled } from "@dlightjs/material-icons"
import clsx from "clsx"
import { css } from "@emotion/css"

interface ConsoleItemProps {
  msg: ContentProp<string>
}

@View
class ConsoleItemClass implements ConsoleItemProps {
  @Content msg = required
  @Env theme: any = required
  isOpenObj = false
  length = this.getLen(this.msg)
  type = this.getType(this.msg)

  getLen(message: any) {
    if (Array.isArray(message)) {
      return message.length
    } else if (message instanceof Map || message instanceof Set) {
      return message.size
    }
    return undefined
  }

  getType(message: any) {
    if (Array.isArray(message)) {
      return "Array"
    } else if (message instanceof Map) {
      return "Map"
    } else if (message instanceof Set) {
      return "Set"
    } else if (message instanceof Promise) {
      return "Promise"
    } else if (typeof message === "object") {
      return "Object"
    } else {
      return typeof message
    }
  }

  toggleOpen() {
    this.isOpenObj = !this.isOpenObj
  }

  @Snippet
    ItemList = (({ listData }: { listData: any[] }) => {
      for (const [key, value] of listData) {
        div()
          .class(this.rowDisplayCss)
        {
          div(`${key}:`)
            .class(this.mrCss)
          ConsoleItem(value)
        }
      }
    }) as Pretty as SnippetTyped<{ listData: any[] }>

  Body() {
    if (typeof this.msg === "object") {
      if (this.msg instanceof Error) {
        div(this.msg as any)
          .class(this.errorTextCss)
      } else {
        div()
          .class(this.columnDisplayCss)
        {
          div()
            .class(clsx(this.rowDisplayCss, this.alignCenterCss))
          {
            div()
              .class(clsx(this.iconCss, this.iconAnimationCss, this.isOpenObj ? this.arrowDownCss : ""))
              .onClick(this.toggleOpen)
            {
              ArrowRightFilled()
                .height(20)
                .width(20)
                .color(this.theme.textColor)
            }
            div(this.length === undefined ? this.type : `${this.type} (${this.length})`)
          }
          if (this.isOpenObj) {
            div()
              .class(clsx(this.columnDisplayCss, this.mlCss))
            {
              if (this.msg instanceof Map || this.msg instanceof Set) {
                this.ItemList()
                  .listData(Array.from(this.msg.entries()))
              } else if (this.msg instanceof Promise) {
                console.log(this.msg)
              } else if (typeof this.msg === "object" || Array.isArray(this.msg)) {
                this.ItemList()
                  .listData(Object.entries(this.msg))
              } else {
                div(this.msg)
              }
            }
          }
        }
      }
    } else {
      div(this.msg)
    }
  }

  iconCss = css`
    padding-top: 4px;
    cursor: pointer;
  `

  iconAnimationCss = css`
    transition: transform 0.1s ease;
  `

  arrowDownCss = css`
    transform: rotate(90deg);
  `

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  `

  alignCenterCss = css`
    align-items: center;
  `

  columnDisplayCss = css`
    display: flex;
    flex-direction: column;
  `

  mlCss = css`
    margin-left: 25px;
  `

  mrCss = css`
    margin-right: 10px;
  `

  errorTextCss = css`
    color: red;
  `
}

const ConsoleItem = ConsoleItemClass as Pretty as Typed<ConsoleItemProps>
export default ConsoleItem
