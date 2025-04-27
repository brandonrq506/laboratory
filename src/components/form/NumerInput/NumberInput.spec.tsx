import { render, screen } from "@testing-library/react";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renders the label and input correctly", () => {
    render(<NumberInput label="Age" registration={{}} />);
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
  });

  it("is accessible even if label is hidden", () => {
    render(<NumberInput label="Invisible" registration={{}} hideLabel />);
    expect(screen.getByLabelText(/invisible/i)).toBeInTheDocument();
  });

  it("displays the asterisk if showAsterisk is true", () => {
    render(<NumberInput label="Age" showAsterisk registration={{}} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not display the asterisk if showAsterisk is false", () => {
    render(<NumberInput label="Age" registration={{}} />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders a description if provided", () => {
    render(
      <NumberInput
        label="Age"
        registration={{}}
        description="Enter your age"
      />,
    );
    expect(screen.getByText(/Enter your age/i)).toBeInTheDocument();
  });

  it("renders an error message if error prop is provided", () => {
    render(
      <NumberInput label="Age" registration={{}} error="Age is required" />,
    );
    expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
  });

  it("renders error instead of description if both are provided", () => {
    const description = "Enter your age";
    const error = "Age is required";

    render(
      <NumberInput
        label="Age"
        registration={{}}
        description={description}
        error={error}
      />,
    );
    expect(screen.queryByText(description)).not.toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("adds aria-invalid and invalid styles when error prop is present", () => {
    render(
      <NumberInput
        label="Username"
        registration={{}}
        error="Invalid username"
      />,
    );
    const inputElement = screen.getByLabelText(/Username/i);
    expect(inputElement).toHaveAttribute("aria-invalid");
  });

  it("does not apply error styles if no error is present", () => {
    render(<NumberInput label="Age" registration={{}} />);
    const inputElement = screen.getByLabelText(/Age/i);
    expect(inputElement).not.toHaveAttribute("aria-invalid");
  });

  it("hides the error message if hideErrorMessage is true", () => {
    render(
      <NumberInput
        label="Age"
        registration={{}}
        error="Age is required"
        hideErrorMessage={true}
      />,
    );
    expect(screen.queryByText(/Age is required/i)).not.toBeInTheDocument();
  });
});
