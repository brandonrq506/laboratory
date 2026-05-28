import { useCallback, useState } from "react";

import type { ExpandedGroupMap } from "../types/expanded-group-map";

export const useExpansionMap = () => {
  const [map, setMap] = useState<ExpandedGroupMap>(() => new Map());

  const toggle = useCallback((applicationId: number) => {
    setMap((prev) => {
      const next = new Map(prev);
      if (next.has(applicationId)) next.delete(applicationId);
      else next.set(applicationId, true);
      return next;
    });
  }, []);

  return [map, toggle] as const;
};
