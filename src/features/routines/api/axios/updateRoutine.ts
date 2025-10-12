import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { EditNameForm } from "../../types/editNameForm";
import { Routine } from "../../types/routine";

type Props = {
  routine: Partial<EditNameForm>;
  routineId: string;
};

export const updateRoutine = async ({ routineId, routine }: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}`;

  const response = await apiV1.patch<Routine>(URL, routine);
  return response.data;
};
