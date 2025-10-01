import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { createRoutesStub } from "react-router";
import { vi } from "vitest";

type DeleteRoutineDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  routineId: number;
};

const mockNavigate = vi.fn();

vi.mock("@/features/routines/components", () => ({
  DeleteRoutineDialog: ({ onDelete }: DeleteRoutineDialogProps) => (
    <button type="button" onClick={onDelete}>
      Confirm delete
    </button>
  ),
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Import after mocks so the component uses the mocked navigate.
import { DeleteRoutinePage } from "../DeleteRoutinePage";

describe("DeleteRoutinePage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("navigates back to routines list after deleting a routine", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/routines/delete/:routineId",
        Component: DeleteRoutinePage,
      },
    ]);

    render(<Stub initialEntries={["/routines/delete/1"]} />);

    const confirmButton = screen.getByRole("button", {
      name: "Confirm delete",
    });

    await user.click(confirmButton);

    expect(mockNavigate).toHaveBeenCalledWith("/routines", { replace: true });
  });
});
