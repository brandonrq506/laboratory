import { useEffect, useState } from "react";

// 100px is a heuristic
const KEYBOARD_HEIGHT = 100;

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) return;

    const handleResize = () => {
      const heightDiff = window.innerHeight - viewport.height;

      setIsKeyboardVisible(heightDiff > KEYBOARD_HEIGHT);
    };

    viewport.addEventListener("resize", handleResize);

    return () => viewport.removeEventListener("resize", handleResize);
  }, []);

  return isKeyboardVisible;
};
