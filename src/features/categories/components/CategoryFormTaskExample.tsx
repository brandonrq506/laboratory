import { type Control, useWatch } from "react-hook-form";

import type { EditForm } from "../types/editForm";
import { ExampleCompletedTask } from "@/features/tasks/components";
import { isColor } from "@/features/colors/utils/isColor";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

import { COLOR_NAME } from "@/features/colors/types/colors";

type Props = {
  control: Control<EditForm>;
};

export const CategoryFormTaskExample = ({ control }: Props) => {
  const color = useWatch({ control, name: "color" });
  const validColor = isColor(color.label) ? color.label : COLOR_NAME.WHITE;

  return (
    <ExampleCompletedTask
      task={{
        activity: {
          exp_seconds: 3800,
          category: {
            id: 1,
            name: "Productive",
            color: validColor,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            user_id: 1,
          },
          max_seconds: 4350,
          name: "Study",
          display_name: "Study",
          user_id: 1,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          id: 1,
        },
        note: "",
        optional_name: null,
        position: null,
        status: TASK_STATUS.COMPLETED,
        scheduled_at: null,
        start_time: "2024-01-01T00:00:00Z",
        end_time: "2024-01-01T01:24:00Z",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        id: 0,
        routine_application: null,
      }}
    />
  );
};
