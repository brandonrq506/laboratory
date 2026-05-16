import { useCallback, useState } from "react";

export const useExpansionMap = () => {
  const [map, setMap] = useState<Map<number, true>>(() => new Map());

  const toggle = useCallback((applicationId: number) => {
    setMap((prev) => {
      const next = new Map(prev);
      if (next.has(applicationId)) next.delete(applicationId);
      else next.set(applicationId, true);
      return next;
    });
  }, []);

  return [map as ReadonlyMap<number, true>, toggle] as const;
};
