import { render, screen } from "@/test/test-utils";
import { HeadingSmall } from "../HeadingSmall";

describe("HeadingSmall", () => {
  it("renders the title correctly", () => {
    render(<HeadingSmall title="Test Title" />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Test Title" }),
    ).toBeInTheDocument();
  });

  it("renders with description when provided", () => {
    render(<HeadingSmall title="Test Title" description="Test description" />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<HeadingSmall title="Test Title" />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });
});
