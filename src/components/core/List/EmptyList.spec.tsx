import { render, screen } from "@testing-library/react";
import { EmptyList } from "./EmptyList";

describe("EmptyList", () => {
  it("renders default text", () => {
    render(<EmptyList />);

    const title = screen.getByText("No Items");
    const description = screen.getByText("Get started by creating a new item.");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <EmptyList title="Custom Title" description="Custom description text." />,
    );

    const title = screen.getByText("Custom Title");
    const description = screen.getByText("Custom description text.");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("renders default icon when no icon is provided", () => {
    render(<EmptyList />);

    const defaultIcon = screen.getByRole("img", { hidden: true });

    expect(defaultIcon).toBeInTheDocument();
  });

  it("renders custom icon", () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;

    render(<EmptyList icon={<CustomIcon />} />);

    const icon = screen.getByTestId("custom-icon");

    expect(icon).toBeInTheDocument();
  });
});
