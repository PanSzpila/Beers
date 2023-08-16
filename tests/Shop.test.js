import React from "react";
//import { render as rtlRender, screen } from "@testing-library/React";
import Shop from "../ShopComponent/Shop";
import "@testing-library/jest-dom/extend-expect";
import { render } from "./test-utils";

import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // ustaw element DOM jako cel renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("form renders with correct text", () => {
  const component = render(<Shop />);
  const formEl = component.getByTestId("form-label-beer-name");

  expect(formEl.textContent).toBe("Beer name:");
});
