import { memo } from "react";

export const NoPropComponentMemo = memo(() => {
  return (
    <div className="mt-10">
      <h1>Propless Component</h1>
      <p>Should not re-render, right?</p>
    </div>
  );
});
