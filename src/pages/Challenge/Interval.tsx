import { useEffect, useState } from "react";
const ONE_SECOND = 1000;

//Resource: https://developer.mozilla.org/en-US/docs/Web/API/setInterval#return_value

export const Interval = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onTick = () => setCount((prevCount) => prevCount + 1);
    setInterval(onTick, ONE_SECOND);
  }, []);

  return <div>{count}</div>;
};
