import { ConfirmDeleteRoutineGroupDialog } from "./confirm-delete-routine-group-dialog";
import { DeleteRoutineGroupButton } from "./delete-routine-group-button";

import { useDisclosure } from "@/hooks";

interface Props {
  routineName: string;
  onDelete: () => void;
}

export const ConfirmDeleteRoutineGroup = ({ routineName, onDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DeleteRoutineGroupButton routineName={routineName} onClick={onOpen} />

      <ConfirmDeleteRoutineGroupDialog
        isOpen={isOpen}
        onClose={onClose}
        routineName={routineName}
        onDelete={onDelete}
      />
    </>
  );
};
