import { render, screen } from "@/test/test-utils";
import { HeadingSmall } from "../HeadingSmall";

describe("HeadingSmall", () => {
  it("renders the title correctly", () => {
    render(<HeadingSmall title="Test Title" />);
    
    expect(screen.getByRole("heading", { level: 3, name: "Test Title" })).toBeInTheDocument();
  });

  it("renders with description when provided", () => {
    render(<HeadingSmall title="Test Title" description="Test description" />);
    
    expect(screen.getByRole("heading", { level: 3, name: "Test Title" })).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<HeadingSmall title="Test Title" />);
    
    expect(screen.getByRole("heading", { level: 3, name: "Test Title" })).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeadingSmall title="Test Title" className="custom-class" />);
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies correct text size", () => {
    render(<HeadingSmall title="Test Title" />);
    
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveClass("text-lg");
  });

  it("applies gray-500 color to description", () => {
    render(<HeadingSmall title="Test Title" description="Test description" />);
    
    const description = screen.getByText("Test description");
    expect(description).toHaveClass("text-gray-500");
  });
});