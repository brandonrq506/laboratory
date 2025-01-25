import { useState } from "react";

type MouseWithCatProps = {
  mouseRender: (mouse: { x: number; y: number }) => React.ReactNode;
};

export const MouseRender = ({ mouseRender }: MouseWithCatProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="h-full bg-white" onMouseMove={handleMouseMove}>
      {mouseRender(mousePosition)}
    </div>
  );
};
