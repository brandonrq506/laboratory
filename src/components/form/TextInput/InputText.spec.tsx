import { render, screen } from "@testing-library/react";
import { InputText } from "./InputText";

describe("InputText", () => {
  it("renders the label and input correctly", () => {
    render(<InputText label="Name" registration={{}} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  it("displays the asterisk if showAsterisk is true", () => {
    render(<InputText label="Password" showAsterisk registration={{}} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not display the asterisk if showAsterisk is false", () => {
    render(<InputText label="Email" registration={{}} />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders a description if provided", () => {
    render(
      <InputText
        label="Username"
        registration={{}}
        description="Enter a unique username"
      />,
    );
    expect(screen.getByText(/Enter a unique username/i)).toBeInTheDocument();
  });

  it("renders an error message if error prop is provided", () => {
    render(
      <InputText
        label="Username"
        registration={{}}
        error="Username is required"
      />,
    );
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
  });

  it("renders error instead of description if both are provided", () => {
    const description = "Enter a unique username";
    const error = "Username is required";

    render(
      <InputText
        label="Username"
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
      <InputText label="Username" registration={{}} error="Invalid username" />,
    );
    const inputElement = screen.getByLabelText(/Username/i);
    expect(inputElement).toHaveAttribute("aria-invalid");
  });

  it("does not apply error styles if no error is present", () => {
    render(<InputText label="Username" registration={{}} />);
    const inputElement = screen.getByLabelText(/Username/i);
    expect(inputElement).not.toHaveAttribute("aria-invalid");
  });

  it("renders with default type 'text' if no type is provided", () => {
    render(<InputText label="Search" registration={{}} />);
    const inputElement = screen.getByLabelText(/Search/i);
    expect(inputElement).toHaveAttribute("type", "text");
  });
});
