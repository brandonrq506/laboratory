import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { ComboBoxWithRenderer } from "../ComboBoxWithRenderer";
import { EnhancedOption } from "@/types/core";

const testOptions: EnhancedOption[] = [
  {
    value: 1,
    label: "Option 1",
    data: { category: { name: "Test Category", color: "blue" } },
  },
  {
    value: 2,
    label: "Option 2",
    data: { category: { name: "Another Category", color: "red" } },
  },
];

describe("ComboBoxWithRenderer", () => {
  const TestWrapper = ({
    options = testOptions,
    renderOption,
  }: {
    options?: EnhancedOption[];
    renderOption?: (option: EnhancedOption) => React.ReactNode;
  }) => {
    return (
      <ComboBoxWithRenderer
        label="Test ComboBox"
        options={options}
        renderOption={renderOption}
        value={null}
        onChange={() => {}}
        onBlur={() => {}}
        name="test"
        ref={() => {}}
      />
    );
  };

  it("renders with default option rendering when no renderOption is provided", () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText("Test ComboBox")).toBeInTheDocument();
  });

  it("displays options when clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const button = screen.getByRole("button", { name: /combobox button/i });
    await user.click(button);

    expect(
      screen.getByRole("option", { name: "Option 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 2" }),
    ).toBeInTheDocument();
  });

  it("uses custom renderOption when provided", async () => {
    const user = userEvent.setup();
    const renderOption = (option: EnhancedOption) => (
      <div data-testid={`custom-option-${option.value}`}>
        Custom: {option.label}
      </div>
    );

    render(<TestWrapper renderOption={renderOption} />);

    const button = screen.getByRole("button", { name: /combobox button/i });
    await user.click(button);

    expect(screen.getByTestId("custom-option-1")).toBeInTheDocument();
    expect(screen.getByTestId("custom-option-2")).toBeInTheDocument();
    expect(screen.getByText("Custom: Option 1")).toBeInTheDocument();
  });

  it("filters options based on search query", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const combobox = screen.getByRole("combobox");
    await user.type(combobox, "Option 1");

    expect(
      screen.getByRole("option", { name: "Option 1" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Option 2" }),
    ).not.toBeInTheDocument();
  });
});
