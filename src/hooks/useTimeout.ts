import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_TIMEOUT = 1000;

export const useTimeout = (callback: () => void) => {
  const latestCbRef = useRef(callback);
  const idRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    latestCbRef.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (idRef.current !== null) {
      clearTimeout(idRef.current);
      idRef.current = null;
      setIsActive(false);
    }
  }, []);

  const start = useCallback((milliseconds = DEFAULT_TIMEOUT) => {
    if (milliseconds < 0 || !Number.isFinite(milliseconds)) return;

    if (idRef.current !== null) {
      clearTimeout(idRef.current);
    }

    idRef.current = setTimeout(() => {
      idRef.current = null;
      setIsActive(false);
      latestCbRef.current();
    }, milliseconds);
    setIsActive(true);
  }, []);

  useEffect(() => clear, [clear]);

  return { start, clear, isActive };
};
