
import { View } from "@dlightjs/dlight"
import { PlayCircleFilled } from "@dlightjs/material-icons"
import { div, button, Env, required, a, img } from "@dlightjs/types"
import { css } from "@emotion/css"
import { Example, musics } from "./utils"
import { EnvType } from "../../../App.view"

@View
class MusicChooser {
  @Env theme: EnvType["theme"] = required
  random() {
    return Math.floor(Math.random() * musics.length)
  }

  randomNumber = this.random()
  music = musics[this.randomNumber]

  View() {
    div().class(this.wrapperCss); {
      button("Get a new song!")
        .class(this.buttonCss)
        .onClick(() => {
          this.randomNumber = this.random()
        })
      a()
        .href(this.music.link)
        .target("_blank")
        .class(this.linkCss)
      {
        div().class(this.zstackCss); {
          img()
            .src(this.music.picture)
            .alt(this.music.name)
            .class(this.musicPicCss)
          PlayCircleFilled()
            .color("rgba(255, 255, 255, 0.7)")
            .width(60)
            .height(60)
        }
      }
    }
  }

  wrapperCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `

  musicPicCss = css`
    width: 200px;
    height: 200px;
    border-radius: 5px;
  `

  linkCss = css`
    display: inline-block;
  `

  zstackCss = css`
    display: grid;
    align-items: center;
    justify-items: center;
    * {
      grid-area: 1/1/1/1;
    }
  `

  buttonCss = css`
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
    margin: 10px;
  `
}

const example: Example = {
  title: "Reactivity has never been so easy!",
  zhTitle: "响应式从未如此简单！",
  description: "No ref(), no useState(), no createSignal(), no $ marked computed states, no memo. Want a state? Set a property! Want a computed state? Set another property! Afraid of redundant computations or re-renders? Be assured, that would never happen!",
  zhDescription: "没有ref()，没有useState()，没有createSignal()，没有$标记的衍生state，没有memo。想要一个state？直接设一个属性！想要一个衍生state？直接设另一个属性！担心冗余计算或重新渲染？放心，这绝对不会发生！",
  codeTitle: "./MusicChooser.view.js",
  code: `@View
class MusicChooser {
  @Prop musics
  musicIdx = this.random()
  music = this.musics[this.musicIdx]
  random() {
    return Math.floor(Math.random() * this.musics.length)
  }

  View() {
    PrettyBtn("Get a new song!")
      .onClick(() => {
        this.musicIdx = this.random()
      })
    MusicDisplay(music)
  }
}
`,
  preview: MusicChooser
}

export default example
