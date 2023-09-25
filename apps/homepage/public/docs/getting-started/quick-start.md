
To create a new dlight.js project, we can use the `create-dlightjs` CLI package, which provides a quick and easy way to set up a new project with all the necessary files and dependencies using Vite. If you prefer to use a different project tooling, such as Parcel or any other tool that supports Babel, you can use the `babel-preset-dlight` preset to build a dlight.js project. 

# 📦 Installation
To create a new CSR SPA DLight.js project, simply run the following command in your terminal:
```shell
npm create dlightjs@latest
```
And follow the guidance:
```shell
? 💻 Your project name (my-dlight-app)
```
Choose ts or js template:
```shell
? 🥑 Language support (Use arrow keys)
❯ Javascript
  Typescript
```
Suggest to choose an empty template for you own project and detailed templates for examples and best practice:
```shell
? 📃 blank template (Use arrow keys)
❯ yes
  no
```
DLight ecosystem packages, see more in [ecosystems](/ecosystems):
```shell
? 📦 Packages to be installed (Press <space> to select, <a> to toggle all, <i>
to invert selection, and <enter> to proceed)
❯◯ @dlightjs/components
 ◯ @dlightjs/material-icons
 ◯ @dlightjs/markit
 ◯ @iandx/easy-css
```
Choose a package manager other than 'NONE' in the selector, and dlight.js will automatically install the required dependencies:
```shell
? 🍲 Package manager (Use arrow keys)
❯ NPM
  PNPM
  YARN
  NONE
```
Once the installation is complete, you should see this and you can start coding in dlight.js with delight!
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

# 🚀 Run project
After the installation, we can run `npm run dev`(or pnpm or yarn) inside the project folder. This command starts a development server that allows us to preview and test our DLight.js application in a web browser. To view your DLight.js application in the browser, simply open your preferred browser and navigate to http://localhost:4320. You should see your application running and ready for testing.


# 👨🏻‍💻 Code breaking down
Let's take a blank js template as an example.
## File structure
After creating a new DlLght.js project using the CLI tool, it sets up a file structure that is similar to a Vite project. The file structure consists of the following files and directories:
```text
- src
  - App.view.ts    // codes for AppView
  - index.ts       // js entry, mounting the AppView into html
- index.html       // html entry
- package.json
- vite.config.ts   // vite config, using vite-plugin-dlight
```
The most inportant two files are `App.view.ts` and `index.js`.

In `App.view.js`, we've declared a App component displaying "hello" in the browser:
```js [src/App.view.js]
import { View } from "@dlightjs/dlight"

@View
export default class App {
  Body() {
    div("hello dlight!")
  }
}
```
Quick Q: Why is it called App.**view**.js instead of App.js? 
* There're basically two main reasons. First to reduce compiling burden, we make our compiler to process files whose name only match this pattern: `**/*.view.js` and second we think it's a good practice to mark all UI files as `xx.view`. 
* And of course you can change it to compile any file you want, just go to the vite config and you'll see a plugin setting like this: `dlight({ files: "**/*.view.js" })`.

And in the `index.js` file, we've imported the previously declared App component from `App.view.js` and mount it to the `<div id="app"/>` element in the `/index.html` file using `render` function from core DLight library.
```js [src/index.js]
import { render } from "@dlightjs/dlight"
import App from "./App.view"

render("app", App)
```