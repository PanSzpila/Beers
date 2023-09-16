import App from "./App";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./custom.scss";


console.log(document.getElementById("root"))
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root") || document.createElement("div") // for testing
);
