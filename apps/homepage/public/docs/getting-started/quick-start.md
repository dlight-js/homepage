To create a new dlight.js project, you can use the `create-dlightjs` CLI package, which provides a quick and easy way to set up a new project with all the necessary files and dependencies using Vite. If you prefer to use different project tooling, like Parcel or any other tool that supports Babel, you can use the `babel-preset-dlight` preset to build a dlight.js project.

# 📦 Installation
To create a new CSR (Client Side Rendering) SPA (Single Page Application) DLight.js project, simply run the following command in your terminal:
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
We suggest you choose an empty template for your own project, and detailed templates for examples and best practice:
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
After the installation, run `npm run dev`(or pnpm or yarn) inside the project folder, and you will notice that this command starts a development server that allows us to preview and test your DLight.js application in a web browser (this is the `vite` dev server at work). To view your DLight.js application in the browser, open your preferred browser and navigate to http://localhost:4320. You should see your application running and ready for testing.


# 👨🏻‍💻 Code breaking down
Let's take a blank js template as an example and break down the code.

## File structure
After creating a new DLight.js project using the CLI tool, it sets up a file structure that is similar to a Vite project. The file structure consists of the following files and directories:
```text
- src
  - App.view.js    // codes for AppView and Entry
- index.html       // html entry
- package.json
- vite.config.js   // vite config, using vite-plugin-dlight
```
The most important file is `App.view.ts`.

Quick question: Why is it called App.**view**.js instead of App.js? 
* There're two main reasons. First to reduce compiling burden, we constrain the compiler to only process files whose name matches this pattern: `**/*.view.js`. Second, we think it's a good practice to mark all UI files as `xx.view`.
* And of course you can change it to compile any file you want, just go to the vite config and you'll see a plugin setting like this: `dlight({ files: "**/*.view.js" })`.


In `App.view.ts`, we've declared a App component displaying "hello" in the browser:
```js [src/App.view.js]
import { View } from "@dlightjs/dlight"

@Main
@View
class App {
  Body() {
    div("hello dlight!")
  }
}
```
and `@Main` will mount this App component to the `#main` element in the `index.html` file.

---
If you've successfully set up and run your DLight.js project, congratulations to you! Navigating through the initial setup and witnessing your app saying "hello dlight!" is the first step into the expansive world of DLight.js. As you continue along this journey, the upcoming sections on 🧩 DLight Syntax and 🛠 DLight Usage will further illuminate your path.
