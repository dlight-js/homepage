export interface Color {
  textColor: string
  highlightColor: string
  bgColor: string
  hoverColor: string
  activeColor: string
  shadowColor: string
  codeBgColor: string
  reverseHLColor: string
  codeBlockHeaderColor: string
  lightShadow: string
  secondBg: string
  codeGray: string
  titleColor: string
}

export const colors: Record<string, Color> = {
  light: {
    textColor: "#042A2B",
    highlightColor: "#f58024",
    bgColor: "#FFF7F0",
    activeColor: "#ffc494",
    hoverColor: "#ffd2ad",
    shadowColor: "#A9A9A9",
    codeBgColor: "rgba(250, 196, 90, 0.1)",
    reverseHLColor: "#72875D",
    codeBlockHeaderColor: "#ffc494",
    lightShadow: "rgba(0, 0, 0, 0.1)",
    secondBg: "rgba(252, 223, 202, 0.5)",
    codeGray: "#EDEDEB",
    titleColor: "#e36707"
  },
  dark: {
    textColor: "#F3FAEA",
    highlightColor: "#BBE683",
    bgColor: "#1E201D",
    activeColor: "#72875D",
    hoverColor: "#5A6B49",
    shadowColor: "#1A1A1A",
    codeBgColor: "rgba(90, 107, 73, 0.3)",
    reverseHLColor: "#ffc494",
    codeBlockHeaderColor: "#5A6B49",
    lightShadow: "rgba(90, 90, 90, 0.1)",
    secondBg: "rgba(56, 61, 54, 0.5)",
    codeGray: "#292927",
    titleColor: "#BBE683"
  }
}
