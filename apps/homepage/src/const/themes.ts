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
}

export const colors: Record<string, Color> = {
  light: {
    textColor: "#042A2B",
    highlightColor: "#f58024",
    bgColor: "#FFF7F0",
    activeColor: "#ffc494",
    hoverColor: "#ffd2ad",
    shadowColor: "#A9A9A9",
    codeBgColor: "rgba(250, 173, 20, 0.3)",
    reverseHLColor: "#72875D",
    codeBlockHeaderColor: "#ffc494"
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
    codeBlockHeaderColor: "#5A6B49"
  }
}
