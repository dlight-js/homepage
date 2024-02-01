
import { View } from "@dlightjs/dlight"
import { div, Env, required, button, h1 } from "@dlightjs/types"
import { css } from "@emotion/css"
import { Example, musics } from "./utils"
import { EnvType } from "../../../App.view"
import { MusicList } from "./ForLoopExample.view"

@View
class AppClass {
  @Env theme: EnvType["theme"] = required
  language = "en"

  View() {
    div().class(this.wrapperCss); {
      h1(this.language === "zh" ? "音乐列表" : "Music List")
        .class(this.titleCss)
      button(this.language === "zh" ? "EN" : "中文")
        .class(this.buttonCss)
        .onClick(() => {
          this.language = this.language === "en" ? "zh" : "en"
        })
    }
    div().class(this.musicListCss); {
      MusicList()
        .musicList(musics)
        .language(this.language)
    }
  }

  wrapperCss = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    margin: 0 0 10px 0;
  `

  titleCss = css`
    margin: 0;
  `

  musicListCss = css`
    height: 300px;
    overflow-y: scroll;
  `

  buttonCss = css`
    width: 50px;
    height: 30px;
    appearance: none;
    background-color: ${this.theme?.textColor};
    color: ${this.theme?.bgColor};
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    padding: 6px 10px;
    position: relative;
    user-select: none;
    vertical-align: middle;
  `
}

const example: Example = {
  title: "Environment: a new paradigm for context",
  zhTitle: "环境：上下文的新范式",
  description: "Across all the frameworks, there's no one solution that can make data passing through different layers of components as easy as passing props. In DLight.js, we introduce a concept called Environment, which is here to make your context data passing easier than ever.",
  zhDescription: "在所有的框架中，没有一个解决方案可以像传递prop一样轻松地使数据通过不同层的组件传递。在DLight.js中，我们引入了一个叫做环境的概念，，它可以让你的上下文数据传递变得无比简单。",
  codeTitle: "./App.view.js",
  code: `@View
class Home {
  @Env language

  View() {
    h1(this.language === "zh" ? "音乐列表" : "Music List")
    MusicList()
  }
}

@View
class App {
  language = "en"

  View() {
    ChangeLanguageBtn()
      .onClick(() => {
        this.language = this.language === "en" ? "zh" : "en"
      })
    env().language(this.language); {
      Home()
    }
  }
}
`,
  preview: AppClass
}

export default example
