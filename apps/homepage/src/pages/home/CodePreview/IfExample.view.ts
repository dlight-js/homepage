
import { View } from "@dlightjs/dlight"
import { FavoriteBorderOutlined, FavoriteFilled, PlayCircleFilled } from "@dlightjs/material-icons"
import { div, Env, required, a, img } from "@dlightjs/types"
import { css } from "@emotion/css"
import { Example, musics } from "./utils"
import { EnvType } from "../../../App.view"

@View
class MusicItemClass {
  @Env theme: EnvType["theme"] = required
  name = musics[0].name
  picture = musics[0].picture
  link = musics[0].link
  album = musics[0].album
  favorite = false

  View() {
    div().class(this.musicItemWrapperCss); {
      div().class(this.musicItemCss); {
        a()
          .href(this.link)
          .target("_blank")
          .class(this.linkCss)
        {
          div().class(this.zstackCss); {
            img()
              .src(this.picture)
              .alt(this.name)
              .class(this.musicPicCss)
            PlayCircleFilled()
              .color("rgba(255, 255, 255, 0.7)")
              .width(30)
              .height(30)
          }
        }
        div().class(this.descriptionCss); {
          div(this.name)
          div(this.album)
            .class(this.albumCss)
        }
      }
      div().class(this.favoriteCss).onClick(() => {
        this.favorite = !this.favorite
      }); {
        if (this.favorite) {
          FavoriteFilled()
            .color("#f0469b")
        } else {
          FavoriteBorderOutlined()
            .title("Like this song!")
            .color(this.theme?.textColor)
        }
      }
    }
  }

  musicItemWrapperCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `

  musicItemCss = css`
    display: flex;
    flex-direction: row;
    margin: 0;
  `

  musicPicCss = css`
    width: 70px;
    height: 70px;
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

  descriptionCss = css`
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
  `

  albumCss = css`
    opacity: 0.5;
    font-size: 12px;
  `

  favoriteCss = css`
    cursor: pointer;
    margin-left: 30px;
  `
}

const example: Example = {
  title: "Bye-bye ternary operator - if statement is back",
  zhTitle: "再见三目运算符 - if语句回来啦",
  description: "So tired of endless ternary operators? Now in DLight, your familiar conditional statements like if-else, switch-case are back! Build the UI as if you are writing a normal JavaScript program.",
  zhDescription: "厌倦了无休止的三目运算符？现在在DLight中，你熟悉的if-else，switch-case等条件语句都回来了！你可以像写普通JavaScript代码一样来构建UI。",
  codeTitle: "./MusicFavoriteItem.view.js",
  code: `@View
class MusicFavoriteItem {
  @Prop musicItem

  View() {
    MusicItem(this.musicItem)
    div().onClick(this.musicItem.toggleFavorite); {
      if (this.musicItem.favorite) {
        FavoriteFilled()
      } else {
        FavoriteBorderOutlined()
          .title("Like this song!")
      }
    }
  }
}
`,
  preview: MusicItemClass
}

export default example
