import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTask } from "@/features/tasks/api/tanstack/useTask";

import { Button, Loading, Modal } from "@/components/core";
import { EditTaskForm } from "@/features/tasks/components/EditTaskForm";
import { RETRY } from "@/constants/actions";

export const EditTaskPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const taskIdInt = parseInt(taskId!);
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isError, isPending, refetch } = useTask(taskIdInt);

  const isScheduledTask = data?.status === "scheduled";

  useEffect(() => setIsOpen(true), []);

  if (!taskId) throw new Error("Task ID is required");

  if (isScheduledTask) throw new Error("Cannot edit a scheduled task");

  if (isPending) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
        <Loading sizeStyles="size-10" className="mx-auto" />
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
        <p>{error.name}</p>
        <p>{error.message}</p>
        <Button onClick={() => refetch()}>{RETRY}</Button>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
      <EditTaskForm task={data} />
    </Modal>
  );
};
