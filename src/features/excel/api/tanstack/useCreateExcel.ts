import { useMutation } from "@tanstack/react-query";

import { createExcel } from "../axios/createExcel";

export const useCreateExcel = () => {
  return useMutation({
    mutationFn: createExcel,
  });
};
