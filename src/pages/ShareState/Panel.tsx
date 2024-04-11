import { useState } from "react";
import { Button } from "@/components/core";

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export const Panel = ({ title, children }: PanelProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="border p-3 text-left">
      <h2 className="font-bold">{title}</h2>
      {isActive ? (
        <>
          <p>{children}</p>
          <Button variant="danger" size="sm" onClick={() => setIsActive(false)}>Hide</Button>
        </>
      ) : (
        <Button size="sm" onClick={() => setIsActive(true)}>Show</Button>
      )}
    </section>
  );
};
