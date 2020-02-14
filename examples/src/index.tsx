import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { UploaderProvider } from "../../src/multiple-uploader/UnloaderContext"
ReactDOM.render(
  <UploaderProvider uploadUri="http://192.168.0.106:4003/graphql" gatewayUri="http://localhost:4000/graphql">
    <App />
  </UploaderProvider>,
  document.getElementById("root")
)
