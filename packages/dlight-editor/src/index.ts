import { render } from "@dlightjs/dlight"
import App from "./App.view"
import { loadMonacoWorker } from "./playground/editor/loader"

loadMonacoWorker()
render("app", App)
