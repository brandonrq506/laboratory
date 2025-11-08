export interface EditRoutineForm {
  name: string;
  start_time: `${number}${number}:${number}${number}` | "" | null;
}

export interface PostRoutineForm {
  name: string;
  start_time: `${number}${number}:${number}${number}` | null;
}
