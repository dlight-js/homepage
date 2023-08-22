# pageConfiguration

# Getting Started

## Installation

To create a new dlight.js project, you can use the create-dlightjs CLI package, which provides a quick and easy way to set up a new project with all the necessary files and dependencies. The latest version of dlight.js is installed by default using Vite. If you prefer to use a different project tooling, such as Parcel or any other tool that supports Babel, you can use the `babel-plugin-dlight` plugin or `babel-preset-dlight` preset to build a dlight.js project. To create a new dlightjs project, simply run the following command in your terminal:

```shell
npm create dlightjs@latest
```

And follow the guidance

```
> ? 💻 Your project name (my-dlight-app)
> ? 🥑 Language support
  ❯ Javascript
    Typescript
> ? 📦 Packages to be installed
  ❯◉ @dlightjs/components
  ◯ @dlightjs/decorators
  ◯ @dlightjs/emotion
> ? 🍲 Package manager
  ❯ NPM
    PNPM
    YARN
    NONE
```

If you choose a package manager other than 'NONE' in the selector, dlight.js will automatically install the required dependencies for you. Once the installation is complete, you should see this and you can start coding in dlight.js with delight!

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

## Run project

After your installation, you can run `npm run dev`(or pnpm or yarn) in your project folder. This command starts a development server that allows you to preview and test your dlight.js application in a web browser. To view your dlight.js application in the browser, simply open your preferred browser and navigate to http://localhost:4300. You should see your application running and ready for testing.

## File structure

When you create a new dlight.js project using the CLI tool, it sets up a file structure that is similar to a Vite project. The file structure consists of the following files and directories:

```text
- src
  - App.view.ts    // codes for AppView
  - index.ts       // js entry and mount the AppView into html
- index.html       // html entry
- package.json
- vite.config.ts   // use vite-plugin-dlight in vite
```

# 