import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { UploaderProvider } from "../../src/multiple-uploader/UploaderContext"
ReactDOM.render(
  <UploaderProvider uploadUri="http://85.29.134.227:4003/graphql" gatewayUri="http://85.29.134.227:4000/graphql">
    <App />
  </UploaderProvider>,
  document.getElementById("root")
)
