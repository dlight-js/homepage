import { DocsStructureMap } from "./docsData"
import { ExamplesCodeData } from "./examplesCodeData"

export const FeatureData = [
  {
    title: "Delightful",
    zhTitle: "轻松",
    imgUrl: "/imgs/logo-leading-png.svg",
    darkImgUrl: "/imgs/airbaloon-dark.svg",
    content: "With an API designed to be intuitive and user-friendly, web development becomes effortless with Dlight, whether you're building a simple website or a complex web application.",
    zhContent: "无论您是构建一个简单的网站还是一个复杂的应用程序，Dlight直观又用户友好的API让网页开发变得轻而易举。"
  },
  {
    title: "Performant",
    zhTitle: "高效",
    imgUrl: "/imgs/performant.svg",
    darkImgUrl: "/imgs/performant-dark.svg",
    content: "With a minuscule file size of just 4KB, Dlight is lightning-fast and ultra-lightweight, delivering optimal performance without the need for manual optimization.",
    zhContent: "Dlight文件大小只有4KB，轻量至极。其速度像闪电一样快，无需手动优化就可以提供最佳性能。"
  },
  {
    title: "DX-first",
    zhTitle: "开发者优先",
    imgUrl: "/imgs/insights.svg",
    darkImgUrl: "/imgs/insights-dark.svg",
    content: "Dlight uses the syntax of function calls and dot notation to make development more enjoyable, without the need to write outdated and hard-to-read XML code.",
    zhContent: "Dlight使用函数调用和点语法，使开发更加愉快，无需编写过时且难以阅读的XML代码。"
  },
  {
    title: "Intuitively Simple",
    zhTitle: "直观简单",
    imgUrl: "/imgs/intuitively.svg",
    darkImgUrl: "/imgs/intuitively-dark.svg",
    content: "Dlight is born reactive and is designed to be intuitively simple, with a minimalistic API that requires no memorization of complex functions or libraries.",
    zhContent: "Dlight具有响应性，并且设计得直观简单，拥有一个简约的API，无需记忆复杂的函数或库。"
  }
]

export const HeaderData = [
  {
    btnName: "Documents",
    zhBtnName: "文档",
    path: "/docs/getting-started",
    structureData: DocsStructureMap
  },
  {
    btnName: "Playground",
    zhBtnName: "演练场",
    path: "/playground"
  },
  {
    btnName: "Examples",
    zhBtnName: "示例",
    path: "/examples/declare-state",
    structureData: ExamplesCodeData
  }
  // {
  //   btnName: "Ecosystem",
  //   zhBtnName: "生态",
  //   path: "/ecosystem"
  // }
]
