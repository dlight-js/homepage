import { View } from "@dlightjs/dlight"
import { Pretty, Typed, div, h1 } from "@dlightjs/types"
import { Logo } from "../../logo"
import { css } from "@iandx/easy-css"

const slogans = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Justo eget magna fermentum iaculis eu non diam phasellus.",
  "In fermentum et sollicitudin ac orci phasellus egestas tellus.",
  "Nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus."
]

@View
class FirstScreen {
  spitOutWords = true

  sloganNum = 0
  slogan = slogans[this.sloganNum]
  getNextSlogan() {
    this.sloganNum = (this.sloganNum + 1) % slogans.length
    console.log(this.sloganNum)
  }

  willMount() {

  }

  View() {
    div()
      .class(this.firstScreenCss)
    {
      Logo()
        .isRotate(this.spitOutWords)
      if (this.spitOutWords) {
        h1(this.slogan)
          .class(this.sloganCss)
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
    img {
      transition: all 0.3s ease-in-out;
    }
    div {
      transition: all 0.3s ease-in-out;
    }
  `

  sloganCss = css`  
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
    /* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
`
}

export default FirstScreen as Pretty as Typed
