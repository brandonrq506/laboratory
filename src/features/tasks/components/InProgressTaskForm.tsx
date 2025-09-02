import { useForm } from "react-hook-form";

import { TextArea, TimeInputV2 } from "@/components/form";
import { ActivityComboBox } from "@/features/activities/components";
import { Button } from "@/components/core";
import { CategoryBadge } from "@/features/categories/components";
import { DirtyFields } from "@/types/core";
import { InProgressFormType } from "../types/inProgressFormType";
import { InProgressTaskAPI } from "../types/inProgressTask";

import { TASK } from "@/constants/entities";
import { UPDATE } from "@/constants/actions";

import { isBefore, parseISO } from "date-fns";
import { floorSeconds } from "@/utils";

type Props = {
  initialValues: InProgressFormType;
  onSubmit: (
    data: InProgressFormType,
    dirtyFields: DirtyFields<InProgressFormType>,
  ) => void;
  task: InProgressTaskAPI;
};

export const InProgressTaskForm = ({
  initialValues,
  task,
  onSubmit,
}: Props) => {
  const { control, formState, handleSubmit, register } =
    useForm<InProgressFormType>({
      values: initialValues,
    });
  const { isSubmitting, errors, dirtyFields } = formState;

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, dirtyFields))}
      className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between gap-2">
        <ActivityComboBox control={control} name="activity" hideLabel />
        <CategoryBadge category={task.activity.category} />
      </div>

      <TextArea
        label="Notes:"
        autoComplete="off"
        rows={4}
        registration={register("note", {
          maxLength: {
            value: 250,
            message: "Note cannot exceed 250 characters.",
          },
        })}
        description="Max 250 characters"
        error={errors.note?.message}
      />

      <TimeInputV2
        control={control}
        label="Start Time"
        name="start_time"
        rules={{
          required: "Start time is required.",
          validate: {
            isPast: (v) => {
              // Flooring startTime and not 'now' to ensure even within the same minute, it is in the past.
              const startTime = floorSeconds(parseISO(v as string));
              const now = new Date();

              return (
                isBefore(startTime, now) || "Start time must be in the past"
              );
            },
          },
        }}
      />

      <div className="flex justify-center">
        <Button type="submit" disabled={isSubmitting}>
          {`${UPDATE} ${TASK}`}
        </Button>
      </div>
    </form>
  );
};
