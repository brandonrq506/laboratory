import { IconButton } from "@/components/core";
import type { InsertMode } from "@/features/tasks/types/insert-mode";
import { useState } from "react";

import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/solid";
import { AddScheduledTaskMenu } from "./AddScheduledTaskMenu";

const APPEND_BUTTON_TEXT = "Append new tasks";
const PREPEND_BUTTON_TEXT = "Prepend new tasks";

export const ScheduledTaskListActions = () => {
  const [insertMode, setInsertMode] = useState<InsertMode>("append");

  return (
    <div className="flex items-center gap-2">
      {insertMode === "append" ? (
        <IconButton
          aria-label={APPEND_BUTTON_TEXT}
          className="rounded-full"
          onClick={() => setInsertMode("prepend")}
          shape="circle"
          title={APPEND_BUTTON_TEXT}
          variant="primaryOutline">
          <BarsArrowDownIcon className="size-5" aria-hidden />
        </IconButton>
      ) : (
        <IconButton
          aria-label={PREPEND_BUTTON_TEXT}
          className="rounded-full"
          onClick={() => setInsertMode("append")}
          shape="circle"
          title={PREPEND_BUTTON_TEXT}
          variant="primaryOutline">
          <BarsArrowUpIcon className="size-5" aria-hidden />
        </IconButton>
      )}

      <AddScheduledTaskMenu insertMode={insertMode} />
    </div>
  );
};
