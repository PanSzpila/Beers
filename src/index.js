import App from "./App";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./custom.scss";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root") || document.createElement("div") // for testing
);
