import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import Allocation from "../allocation";
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders without crashing", () => {
  act(() => {
    render(<Allocation />, container);
  });
  const form = document.querySelector("form");
  expect(container.contains(form));
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
