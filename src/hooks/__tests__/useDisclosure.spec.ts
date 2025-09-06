import { act, renderHook } from "@testing-library/react";
import { useDisclosure } from "../useDisclosure";

describe("useDisclosure", () => {
  it("returns false by default and toggles correctly", () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);

    act(() => result.current.onOpen());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.onClose());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.onToggle());
    expect(result.current.isOpen).toBe(true);
  });

  it("accepts an initial value", () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });
});
