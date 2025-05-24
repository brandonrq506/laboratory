import { Control, useWatch } from "react-hook-form";

import { EditForm } from "../types/editForm";
import { ExampleCompletedTask } from "@/features/tasks/components";
import { isColor } from "@/features/colors/utils/isColor";

type Props = {
  control: Control<EditForm>;
};

export const CategoryFormTaskExample = ({ control }: Props) => {
  const color = useWatch({ control, name: "color" });
  const validColor = isColor(color.label) ? color.label : "white";

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
          user_id: 1,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          id: 1,
        },
        optional_name: null,
        position: null,
        status: "completed",
        start_time: "2024-01-01T00:00:00Z",
        end_time: "2024-01-01T01:24:00Z",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        id: 0,
      }}
    />
  );
};
