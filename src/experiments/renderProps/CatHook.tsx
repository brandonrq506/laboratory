import { useMousePosition } from "./useMousePosition";

export const CatHook = () => {
  const mouse = useMousePosition();
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "pink",
        borderRadius: "50%",
        opacity: 0.8,
        transform: `translate(${mouse.x}px, ${mouse.y}px)`,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
};
