import { render, screen } from "@/test/test-utils";
import { HeadingLarge } from "../HeadingLarge";

describe("HeadingLarge", () => {
  it("renders title with description when provided", () => {
    render(<HeadingLarge title="Test Title" description="Test description" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<HeadingLarge title="Test Title" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });
});
