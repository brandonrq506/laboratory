import { CatRender } from "./CatRender";
import { MouseRender } from "./MouseRender";

export const MouseTracker = () => {
  return (
    <>
      <h1>Move the mouse around!</h1>
      <MouseRender mouseRender={(mouse) => <CatRender mouse={mouse} />} />
    </>
  );
};
