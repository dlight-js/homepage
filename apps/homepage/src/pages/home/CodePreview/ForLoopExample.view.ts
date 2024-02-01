
import { View } from "@dlightjs/dlight"
import { PlayCircleFilled } from "@dlightjs/material-icons"
import { section, type Pretty, Prop, h1, div, a, SubTyped, img, Typed } from "@dlightjs/types"
import { css } from "@emotion/css"
import { Example, MusicItem, musics } from "./utils"

@View
class ForLoopClass {
  @Prop musicList = musics.slice(1, 4)
  @Prop language = "en"

  heading = this.language === "en"
    ? `${this.musicList.length} songs  by Lana Del Rey`
    : `Lana Del Rey的${this.musicList.length}首歌`

  @View MusicItem = (({ name, link, album, picture }: MusicItem) => {
    div().class(this.musicItemCss); {
      a()
        .href(link)
        .target("_blank")
        .class(this.linkCss)
      {
        div().class(this.zstackCss); {
          img()
            .src(picture)
            .alt(name)
            .class(this.musicPicCss)
          PlayCircleFilled()
            .color("rgba(255, 255, 255, 0.7)")
            .width(30)
            .height(30)
        }
      }
      div().class(this.descriptionCss); {
        div(name)
        div(album)
          .class(this.albumCss)
      }
    }
  }) as Pretty as SubTyped<MusicItem>

  musicItemCss = css`
    display: flex;
    flex-direction: row;
    margin: 15px 0 0 0;
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

  View() {
    section(); {
      h1(this.heading).class(this.headingCss)
      for (const { name, link, album, picture } of this.musicList) {
        this.MusicItem()
          .name(name)
          .link(link)
          .album(album)
          .picture(picture)
      }
    }
  }

  headingCss = css`
    margin: 0;
    line-height: 30px;
  `
}

export const MusicList = ForLoopClass as Pretty as Typed<{ musicList: MusicItem[], language: string }>

const example: Example = {
  title: "Meet your best old friend: for loop",
  zhTitle: "看看你的老朋友：for循环",
  description: "It's really been a long while since you last used for loop to build your UI view, right? Now let's welcome it back! In DLight.js, we don't tend to introduce any new syntax to you. Want an array of data to be rendered? Just use a for loop!",
  zhDescription: "你已经很久没有用for循环来构建UI了吧？现在它回来了！在DLight.js中，我们不打算介绍任何新的语法。想要渲染一个数据数组？用for循环就行了！",
  codeTitle: "./MusicList.view.js",
  code: `@View
class MusicList {
  @Prop musicList
  heading = \`\${this.musicList.length} \${
    this.musicList.length > 1 ? "songs" : "song"
  } by Lana Del Rey\`

  View() {
    section(); {
      h1(this.heading)
      for (const music of this.musicList) {
        MusicItem(music)
      }
    }
  }
}
  `,
  preview: ForLoopClass
}

export default example
