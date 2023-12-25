import { MouseRender } from "./MouseRender";
import { CatRender } from "./CatRender";

export const MouseTracker = () => {
  return (
    <>
      <h1>Move the mouse around!</h1>
      <MouseRender mouseRender={(mouse) => <CatRender mouse={mouse} />} />
    </>
  );
};
