import { type RenderOptions, render } from "@testing-library/react";
import { CommonProviders } from "./CommonWrapper";
import type { ReactElement } from "react";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: CommonProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
