import { DocsStructureMap } from "./docsData"
import { ExamplesCodeData } from "./examplesCodeData"

export const FeatureData = [
  {
    title: "Delightful",
    imgUrl: "/imgs/logo-leading-png.svg",
    content: "With an API designed to be intuitive and user-friendly, web development becomes effortless with Dlight, whether you're building a simple website or a complex web application."
  },
  {
    title: "Performant",
    imgUrl: "/imgs/performant.svg",
    content: "With a minuscule file size of just 4KB, Dlight is lightning-fast and ultra-lightweight, delivering optimal performance without the need for manual optimization."
  },
  {
    title: "DX-first",
    imgUrl: "/imgs/insights.svg",
    content: "Dlight uses the syntax of function calls and dot notation to make development more enjoyable, without the need to write outdated and hard-to-read XML code."
  },
  {
    title: "Intuitively Simple",
    imgUrl: "/imgs/intuitively.svg",
    content: "Dlight is born reactive and is designed to be intuitively simple, with a minimalistic API that requires no memorization of complex functions or libraries."
  }
]

export const HeaderData = [
  {
    btnName: "Documents",
    path: "/docs/getting-started",
    structureData: DocsStructureMap
  },
  {
    btnName: "Playground",
    path: "/playground"
  },
  {
    btnName: "Examples",
    path: "/examples",
    structureData: ExamplesCodeData
  },
  {
    btnName: "Ecosystem",
    path: "/ecosystem"
  }
]
