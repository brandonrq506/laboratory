import { useDisclosure } from "@/hooks";

import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm";
import { DateFilter } from "@/components/core/Date";
import { HeadingLarge } from "@/components/layout";
import { HistoryTaskList } from "@/pages/Tasks";
import { Modal } from "@/components/core";
import { PlusIcon } from "@heroicons/react/24/solid";

import { getPageTitle } from "@/utils";
import { historyTasksQueryOptions } from "@/features/tasks/api/queries";
import { redirectHistoryFutureDate } from "@/utils/taskDateRouting";
import { validateDateSearch } from "@/utils/search";

type HistorySearch = {
  date: string;
};

export const Route = createFileRoute("/__protected/history")({
  validateSearch: (search): HistorySearch => {
    return validateDateSearch(search.date as string | undefined);
  },
  loaderDeps: ({ search: { date } }) => ({ date }),
  beforeLoad: ({ search: { date } }) => redirectHistoryFutureDate(date),
  loader: ({ context: { queryClient }, deps: { date } }) =>
    queryClient.query({
      ...historyTasksQueryOptions(date),
      staleTime: "static",
    }),
  head: () => ({ meta: [{ title: getPageTitle("History") }] }),
  component: RouteComponent,
});

function RouteComponent() {
  const { date } = Route.useSearch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <HeadingLarge title="Tasks" />
      <div className="mb-2 flex w-full items-center justify-between">
        <DateFilter
          label="Date Filter"
          hideLabel
          className="w-full"
          value={date}
        />
        <button type="button" onClick={onOpen}>
          <span className="sr-only">Add Task</span>
          <PlusIcon className="text-primary-text size-5" aria-hidden />
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
