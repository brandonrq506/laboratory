import { render, screen } from "@/test/test-utils";
import { HeadingLarge } from "../HeadingLarge";

describe("HeadingLarge", () => {
  it("renders the title correctly", () => {
    render(<HeadingLarge title="Test Title" />);
    
    expect(screen.getByRole("heading", { level: 1, name: "Test Title" })).toBeInTheDocument();
  });

  it("renders with description when provided", () => {
    render(<HeadingLarge title="Test Title" description="Test description" />);
    
    expect(screen.getByRole("heading", { level: 1, name: "Test Title" })).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<HeadingLarge title="Test Title" />);
    
    expect(screen.getByRole("heading", { level: 1, name: "Test Title" })).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeadingLarge title="Test Title" className="custom-class" />);
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies correct text sizes for mobile and desktop", () => {
    render(<HeadingLarge title="Test Title" />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-2xl/7", "sm:text-3xl");
  });

  it("applies gray-500 color to description", () => {
    render(<HeadingLarge title="Test Title" description="Test description" />);
    
    const description = screen.getByText("Test description");
    expect(description).toHaveClass("text-gray-500");
  });
});