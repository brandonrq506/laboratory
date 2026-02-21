import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminProtectedContent } from "@/features/user/components";
import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm";
import { DateFilter } from "@/components/core/Date";
import { ExcelLink } from "@/pages/Tasks/ExcelLink";
import { HistoryTaskList } from "@/pages/Tasks";
import { Modal } from "@/components/core";
import { PageHeaderWithActions } from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import { historyTasksQueryOptions } from "@/features/tasks/api/queries";
import { useDisclosure } from "@/hooks";
import { validateDateSearch } from "@/utils/search";

type HistorySearch = {
  date: string;
};

export const Route = createFileRoute("/__protected/history")({
  validateSearch: (search): HistorySearch => {
    return validateDateSearch(search.date as string | undefined);
  },
  loaderDeps: ({ search: { date } }) => ({ date }),
  loader: ({ context: { queryClient }, deps: { date } }) =>
    queryClient.ensureQueryData(historyTasksQueryOptions(date)),
  component: RouteComponent,
});

function RouteComponent() {
  const { date } = Route.useSearch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <PageHeaderWithActions
        title="Tasks"
        actions={
          <AdminProtectedContent>
            <ExcelLink />
          </AdminProtectedContent>
        }
      />
      <div className="mb-2 flex w-full items-center justify-between">
        <DateFilter
          label="Date Filter"
          hideLabel
          className="w-full"
          value={date}
        />
        <button type="button" onClick={onOpen}>
          <span className="sr-only">Add Task</span>
          <PlusIcon className="size-5 text-blue-600" aria-hidden />
        </button>
      </div>
      <HistoryTaskList />
      <Modal isOpen={isOpen} onClose={onClose}>
        <CreateTaskForm date={date} onClose={onClose} />
      </Modal>
      <Outlet />
    </div>
  );
}
