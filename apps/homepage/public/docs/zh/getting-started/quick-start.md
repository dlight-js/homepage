要创建一个新的 dlight.js 项目，我们可以使用`create-dlightjs`CLI 工具包，它提供了一种快速简便的方法，使用 Vite 来设置包含所有必要文件和依赖项的新项目。如果您更喜欢使用 Parcel 或任何其他支持 Babel 的工具，您可以使用`babel-preset-dlight`预设来构建 dlight.js 项目。

# 📦 安装
要创建一个新的 CSR（客户端渲染）SPA（单页应用程序）DLight.js 项目，只需在终端运行以下命令：
```shell
npm create dlightjs@latest
```
并按照指引操作：
```shell
? 💻 Your project name (my-dlight-app)
```
选择 ts 或 js 模板：
```shell
? 🥑 Language support (Use arrow keys)
❯ Javascript
  Typescript
```
建议为您自己的项目选择一个空白模板，而对于示例和最佳实践选择详细模板：
```shell
? 📃 blank template (Use arrow keys)
❯ yes
  no
```
DLight 生态系统包，更多信息请见 生态系统：[ecosystems](/ecosystems):
```shell
? 📦 Packages to be installed (Press <space> to select, <a> to toggle all, <i>
to invert selection, and <enter> to proceed)
❯◯ @dlightjs/components
 ◯ @dlightjs/material-icons
 ◯ @dlightjs/markit
 ◯ @iandx/easy-css
```
选择一个非 'NONE' 的包管理器，dlight.js 将自动安装所需的依赖项：
```shell
? 🍲 Package manager (Use arrow keys)
❯ NPM
  PNPM
  YARN
  NONE
```
安装完成后，您应该看到以下内容，您可以开始在 dlight.js 中愉快地编码了！
``` shell
🎉 All done!

     /DDDDDDD  /DD       /DD           /DD         /DD    
    | DD__  DD| DD      |__/          | DD        | DD    
 /:D| DD  \ DD| DD       /DD  /DDDDDD | DDDDDDD  /DDDDDD  
|__/| DD  | DD| DD      | DD /DD__  DD| DD__  DD|_  DD_/  
    | DD  | DD| DD      | DD| DD  \ DD| DD  \ DD  | DD    
 /:D| DD  | DD| DD      | DD| DD  | DD| DD  | DD  | DD /DD
|__/| DDDDDDD/| DDDDDDDD| DD|  DDDDDDD| DD  | DD  |  DDDD/
    |_______/ |________/|__/ \____  DD|__/  |__/   \___/  
                             /DD  \ DD                    
                            |  DDDDDD/ 
                             \______/                                               

:D Happy coding in DLight!
```

# 🚀 运行项目
安装完成后，在项目文件夹内运行`npm run dev`（或 pnpm 或 yarn），您会注意到这个命令启动了一个开发服务器，让我们可以在网络浏览器中预览和测试我们的 DLight.js 应用程序（这就是`vite`的工作方式）。要在浏览器中查看您的 DLight.js 应用程序，请打开您喜欢的浏览器并导航到 http://localhost:4320。您应该可以看到您的应用程序正在运行并准备好进行测试。

# 👨🏻‍💻 代码分解
以一个空白的 js 模板为例，让我们分解一下代码。
## 文件结构
使用 CLI 工具创建一个新的 DLight.js 项目后，它会设置一个类似于 Vite 项目的文件结构。文件结构包括以下文件和目录：
```text
- src
  - App.view.ts    // codes for AppView
  - index.ts       // js entry, mounting the AppView into html
- index.html       // html entry
- package.json
- vite.config.ts   // vite config, using vite-plugin-dlight
```
最重要的两个文件是 `App.view.ts` 和 `index.js`.

在 `App.view.js`中, 我们已经声明了一个在浏览器中显示“hello dlight!”的 App 组件：
```js [src/App.view.js]
import { View } from "@dlightjs/dlight"

@View
export default class App {
  Body() {
    div("hello dlight!")
  }
}
```
为什么它叫做 App.view.js 而不是 App.js？
* 有两个主要原因。首先为了减轻编译负担，我们让编译器只处理匹配此模式的文件名：`**/*.view.js`；其次我们认为将所有 UI 文件标记为`xx.view`是一个好习惯。 
* 当然，您可以更改它以编译您想要的任何文件，只需转到 vite 配置，您会看到一个插件设置，如：`dlight({ files: "**/*.view.js" })`。

在`index.js`文件中，我们从`App.view.js`导入之前声明的 App 组件，并使用来自核心 DLight 库的`render`函数将其挂载到`/index.html`文件中的`<div id="app"/>`元素上。
```js [src/index.js]
import { render } from "@dlightjs/dlight"
import App from "./App.view"

render("app", App)
```

---
如果您已成功设置并运行了 DLight.js 项目，恭喜您！顺利完成初始设置并见证您的应用程序说出“hello dlight!”是踏入 DLight.js 广阔世界的第一步。随着您继续这段旅程，接下来的🧩 DLight 语法和🛠 DLight 使用章节将进一步照亮您的道路。
