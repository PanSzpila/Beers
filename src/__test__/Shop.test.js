import React from "react";
//import { render as rtlRender, screen } from "@testing-library/React";
import Shop from "../Shop";
import { sum } from "../Shop";
import "@testing-library/jest-dom/extend-expect";
import { render } from "./test-utils";

test("form renders with correct text", () => {
  const component = render(<Shop />);
  const formEl = component.getByTestId("form-label-beer-name");

  expect(formEl.textContent).toBe("Beer name:");
});
