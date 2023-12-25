import { useState } from "react";

type MouseWithCatProps = {
  mouseRender: (mouse: { x: number; y: number }) => JSX.Element;
};

export const MouseRender = ({ mouseRender }: MouseWithCatProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      className="bg-white h-full"
      onMouseMove={handleMouseMove}>
      {mouseRender(mousePosition)}
    </div>
  );
};
