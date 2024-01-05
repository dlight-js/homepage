import { View } from "@dlightjs/dlight"
import { Pretty, Typed, div, h1, set } from "@dlightjs/types"
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
      this.interval && clearInterval(this.interval)
      setTimeout(() => {
        this.sloganIdx = 0
        this.spitOutWords = false
        this.interval && clearInterval(this.interval)
        this.fold()
      }, 5000)
      return
    }
    this.sloganIdx++
  }

  interval = null

  fold() {
    this.interval = setInterval(() => {
      if (this.sloganIdx === 0) {
        this.interval && clearInterval(this.interval)
        setTimeout(() => {
          this.spitOutWords = true
          this.getNewSlogan()
          this.show()
        }, 5000)
      }
      this.sloganIdx--
    }, 20)
  }

  show() {
    this.interval = setInterval(() => {
      this.getNewSloganWord()
    }, 30)
  }

  didMount() {
    setTimeout(() => {
      this.spitOutWords = true
    }, 500)
    setTimeout(() => {
      this.show()
    }, 1000)
  }

  View() {
    div()
      .class(this.firstScreenCss)
    {
      Logo()
        .isRotate(this.spitOutWords)
      h1(this.sloganWord)
    }
  }

  firstScreenCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    img {
      transition: all 0.5s ease-in-out;
    }
  `
}

export default FirstScreen as Pretty as Typed
