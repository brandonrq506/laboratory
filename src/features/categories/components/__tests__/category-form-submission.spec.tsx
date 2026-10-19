import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { COLOR_NAME } from "@/features/colors/types/colors";
import { CreateCategoryForm } from "../CreateCategoryForm";
import { EditCategoryForm } from "../EditCategoryForm";

import type * as TanstackRouter from "@tanstack/react-router";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanstackRouter>()),
  useNavigate: () => mocks.navigate,
}));

vi.mock("../../api/tanstack/useCreateCategory", () => ({
  useCreateCategory: () => ({ mutateAsync: mocks.create }),
}));

vi.mock("../../api/tanstack/useUpdateCategory", () => ({
  useUpdateCategory: () => ({ mutateAsync: mocks.update }),
}));

describe("Category form submission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.create.mockResolvedValue(undefined);
    mocks.update.mockResolvedValue(undefined);
  });

  it("creates a category with a color name", async () => {
    const user = userEvent.setup();
    render(<CreateCategoryForm />);

    await user.type(screen.getByLabelText("Name *"), "Study");
    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(screen.getByRole("option", { name: COLOR_NAME.EMERALD }));
    await user.click(screen.getByRole("button", { name: "Add Category" }));

    await waitFor(() => {
      expect(mocks.create).toHaveBeenCalledWith({
        name: "Study",
        color: COLOR_NAME.EMERALD,
      });
    });
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/settings/categories" });
  });

  it("updates a category with its selected color name", async () => {
    const user = userEvent.setup();
    const categoryId = 4;
    render(
      <EditCategoryForm
        categoryId={categoryId}
        initialValues={{ name: "Study", color: COLOR_NAME.EMERALD }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Color" }));
    await user.click(screen.getByRole("option", { name: COLOR_NAME.BLUE }));
    await user.click(screen.getByRole("button", { name: "Update Category" }));

    await waitFor(() => {
      expect(mocks.update).toHaveBeenCalledWith({
        categoryId,
        category: { name: "Study", color: COLOR_NAME.BLUE },
      });
    });
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/settings/categories" });
  });
});
