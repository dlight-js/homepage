export interface Color {
  text: string
  orange1: string
  orange2: string
  orange3: string
  orange4: string
  orange5: string
  orange6: string
  orange7: string
  orange8: string
  orange9: string
  orange10: string
  orange11: string
  orange12: string
  orange13: string
  orange14: string
  green1: string
  green2: string
  green3: string
  green4: string
  green5: string
  green6: string
  green7: string
  green8: string
  green9: string
  green10: string
  green11: string
  green12: string
  green13: string
  green14: string
}

export const colors: Record<string, Color> = {
  light: {
    text: "fff",
    orange1: "#fff9f4", // primaryBgColor
    orange2: "#fef2e8",
    orange3: "#feecdd",
    orange4: "#fde5d2", // secondaryBgColor
    orange5: "#fcd8bb",
    orange6: "#fbcba5",
    orange7: "#fabe8e",
    orange8: "#daa172",
    orange9: "#bb8357",
    orange10: "#9b663b",
    orange11: "#8b572d",
    orange12: "#7c4820",
    orange13: "#6c3a12",
    orange14: "#5c2b04",
    green1: "#f8fcf4",
    green2: "#f1f9e9",
    green3: "#eaf6de",
    green4: "#e3f3d3",
    green5: "#d6eebd",
    green6: "#c8e8a7",
    green7: "#bae291",
    green8: "#9cc177",
    green9: "#7fa05d",
    green10: "#617e44",
    green11: "#526e37",
    green12: "#445d2a", // primaryTextColor
    green13: "#354d1d",
    green14: "#263c10"
  },
  dark: {
    text: "#000",
    orange1: "#5c2b04",
    orange2: "#6c3a12",
    orange3: "#7c4820",
    orange4: "#8b572d",
    orange5: "#9b663b",
    orange6: "#bb8357",
    orange7: "#daa172",
    orange8: "#fabe8e",
    orange9: "#fbcba5",
    orange10: "#fcd8bb",
    orange11: "#fde5d2",
    orange12: "#feecdd",
    orange13: "#fef2e8",
    orange14: "#fff9f4",
    green1: "#263c10",
    green2: "#354d1d",
    green3: "#445d2a",
    green4: "#526e37",
    green5: "#617e44",
    green6: "#7fa05d",
    green7: "#9cc177",
    green8: "#bae291",
    green9: "#c8e8a7",
    green10: "#d6eebd",
    green11: "#e3f3d3",
    green12: "#eaf6de",
    green13: "#f1f9e9",
    green14: "#f8fcf4"
  }
}
