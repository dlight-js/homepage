
import { View } from "@dlightjs/dlight"
import { section, type Pretty, type Typed, Prop, h1, div, a } from "@dlightjs/types"

export const forLoopCode = `@View
class MusicList {
  @Prop musicList
  heading = \`\${this.musicList.length} songs\`

  View() {
    section(); {
      h1(this.heading)
      for (const { name, link, album } of this.musicList) {
        MusicItem()
          .name(name)
          .link(link)
          .album(album)
      }
    }
  }
}
`

@View
class ForLoopClass {
  @Prop musicList: Array<{
    name: string
    link: string
    album: string
  }> = [{
      name: "Happiness is a butterfly",
      link: "https://www.youtube.com/watch?v=nbcXvlEa7Wk",
      album: ""
    }]

  heading = `${this.musicList.length} songs`

  View() {
    section(); {
      h1(this.heading)
      for (const { name, link, album } of this.musicList) {
        div(); {
          a(name).href(link)
          div(album)
        }
      }
    }
  }
}

export const ForLoop = ForLoopClass as Pretty as Typed
