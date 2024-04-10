import { useState, useEffect } from "react";

const MAX = 100;

export const useScroll = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollListener = () => {
      const newPercentage = Math.floor(
        (document.documentElement.scrollTop /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight)) *
          MAX,
      );
      if (newPercentage !== progress) {
        setProgress(newPercentage);
      }
    };

    window.addEventListener("scroll", scrollListener, false);

    return () => {
      window.removeEventListener("scroll", scrollListener, false);
    };
  }, [progress]);

  return progress;
};
