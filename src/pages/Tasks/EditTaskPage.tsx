import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Button, Loading, Modal } from "@/components/core";
import {
  EditCompletedTaskForm,
  EditInProgressTaskForm,
  EditScheduledTaskForm,
} from "@/features/tasks/components";
import { RETRY } from "@/constants/actions";
import { taskDetailsOptions } from "@/features/tasks/api/queryOptions";

export const EditTaskPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const taskIdInt = parseInt(taskId!);
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isError, isPending, refetch } = useQuery(
    taskDetailsOptions(taskIdInt),
  );

  useEffect(() => setIsOpen(true), []);

  if (!taskId) throw new Error("Task ID is required");

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

  if (data.status === "scheduled")
    return (
      <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
        <EditScheduledTaskForm task={data} />
      </Modal>
    );

  if (data.status === "in_progress") {
    return (
      <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
        <EditInProgressTaskForm task={data} />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={() => navigate(-1)}>
      <EditCompletedTaskForm task={data} />
    </Modal>
  );
};
