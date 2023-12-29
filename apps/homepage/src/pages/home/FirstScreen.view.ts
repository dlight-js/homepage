import { View } from "@dlightjs/dlight"
import { Pretty, Typed, div, h1 } from "@dlightjs/types"
import { Logo } from "../../logo"
import { css } from "@iandx/easy-css"

const slogans = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Justo eget magna fermentum iaculis eu non diam phasellus.",
  "In fermentum et sollicitudin ac orci phasellus egestas tellus.",
  "Nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus."
].map((slogan) => slogan.split(""))

@View
class FirstScreen {
  spitOutWords = false

  sloganNum = 0
  slogan = slogans[this.sloganNum]
  getNewSlogan() {
    this.sloganNum = (this.sloganNum + 1) % slogans.length
  }

  sloganIdx = 0
  sloganWord = this.slogan.slice(0, this.sloganIdx).join("")
  getNewSloganWord() {
    if (this.sloganIdx === this.slogan.length - 1) {
      // this.spitOutWords = false
      // this.getNewSlogan()
      // this.sloganIdx = 0
      // this.interval && clearInterval(this.interval)
      // setTimeout(() => {
      //   this.show()
      // }, 2000)
      return
    }
    this.spitOutWords = true
    this.sloganIdx++
  }

  interval = null

  show() {
    // this.interval =
  }

  willMount() {
    console.log("i")
    this.show()
    setInterval(() => {
      this.getNewSloganWord()
    }, 30)
  }

  View() {
    div()
      .class(this.firstScreenCss)
    {
      Logo()
        .isRotate(this.spitOutWords)
      if (this.spitOutWords) {
        h1(this.sloganWord)
      }
    }
  }

  firstScreenCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100vh;
    color: white;
    img {
      transition: all 0.3s ease-in-out;
    }
  `
}

export default FirstScreen as Pretty as Typed
