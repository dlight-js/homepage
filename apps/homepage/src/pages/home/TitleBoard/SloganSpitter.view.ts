import { View, Env, Pretty, Typed, div, tag } from "@dlightjs/dlight"
import { Logo } from "../../../logo"
import { css } from "@emotion/css"
import { EnvType } from "../../../App.view"

@View
class SloganSpitter implements EnvType {
  static slogans = [
    "Everything is intuitive, code at will ",
    "New DSL to build UI, say bye-bye to JSX ",
    "Every JS developer is a DLight developer ",
    "Nothing to remember, just write a class ",
    "Lightweight: 3.7kB minified + gzipped ",
    "Lightning-fast: only 1.06x vanilla JS ",
    "Memory-efficient: only 1.15x vanilla JS ",
    "Make your development journey delightful "
  ].map((slogan) => slogan.split(""))

  static zhSlogans = [
    "一切变得直觉化，编你所想 ",
    "用新DSL构建UI，告别JSX ",
    "每个JS开发者都是DLight开发者 ",
    "无需记忆，只需写一个class ",
    "轻量级: 3.7kB minified + gzipped ",
    "闪电般的速度: 只有 1.06x vanilla JS ",
    "内存高效: 只有 1.15x vanilla JS ",
    "让你的开发之旅变得愉快 🥳"
  ].map((slogan) => slogan.split(""))

  static icons = [
    "💡",
    "👋🏻",
    "🤩",
    "🎨",
    "🪶",
    "🚀",
    "📄",
    "🥳"
  ]

  @Env isShortView?: boolean | undefined
  @Env language?: string | undefined

  logoWidth = this.isShortView ? "30px" : "45px"
  headerTag = this.isShortView ? "h3" : "h1"

  animationTime = 600
  holdShowTime = 3000
  holdEmptyTime = 500

  sloganNum = 0
  sloganSentence = (
    this.language === "en"
      ? SloganSpitter.slogans
      : SloganSpitter.zhSlogans
  )[this.sloganNum]

  newSloganSentence() {
    this.sloganNum = (this.sloganNum + 1) % SloganSpitter.slogans.length
  }

  isShow = true

  sloganIdx = 0
  sloganTemp = this.sloganSentence.slice(0, this.sloganIdx).join("")
  slogan = this.sloganIdx === this.sloganSentence.length + 1
    ? this.sloganTemp + SloganSpitter.icons[this.sloganNum]
    : this.sloganTemp

  async transformSlogan() {
    if (this.isShow) {
      if (this.sloganIdx === this.sloganSentence.length + 1) {
        await this.hold(this.holdShowTime)
        return
      }
      this.sloganIdx++
      return
    }
    if (this.sloganIdx === 0) {
      this.newSloganSentence()
      await this.hold(this.holdEmptyTime)
      return
    }
    this.sloganIdx--
  }

  interval?: any

  spitOrFold() {
    this.interval = setInterval(() => {
      void this.transformSlogan()
    }, this.animationTime / this.sloganSentence.length)
  }

  async sleep(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms))
  }

  async hold(duration: number) {
    this.interval && clearInterval(this.interval)
    await this.sleep(duration)
    this.isShow = !this.isShow
    this.spitOrFold()
  }

  pause() {
    this.interval && clearInterval(this.interval)
  }

  resume() {
    this.spitOrFold()
  }

  didMount() {
    setTimeout(() => {
      this.spitOrFold()
    }, this.holdEmptyTime)
  }

  Body() {
    div()
      .class(this.wrapperCss)
    {
      Logo()
        .isRotate(this.interval && this.isShow)
        .class(this.logoCss)
        .width(this.logoWidth)
        .height(this.logoWidth)
      tag(this.headerTag)(this.slogan)
        .class(this.sloganTextCss)
    }
  }

  logoCss = css`
    transition: transform ${this.animationTime / 1000}s ease-in-out;
  `

  wrapperCss = css`
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  `

  sloganTextCss = css`
    font-weight: 500;
  `
}

export default SloganSpitter as Pretty as Typed
