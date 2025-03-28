/* TODO:
   - Remove the Dialog and Transition components.
   - There must be a Base ComboBox which literally only shows options
   - Then there must be the one who allows for groups, options, and whether those options are persistent.
    */

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

const projects = [
  { id: 1, name: "Workflow Inc. / Website Redesign", url: "#" },
  { id: 2, name: "Brandon Ramirez", url: "#" },
  { id: 3, name: "Jane Cooper", url: "#" },
  // More projects...
];
const recent = [projects[0]];

/* const quickActions = [
     { name: "Add new file...", icon: DocumentPlusIcon, shortcut: "N", url: "#" },
     { name: "Add new folder...", icon: FolderPlusIcon, shortcut: "F", url: "#" },
     { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
     { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
   ]; */

export function DialogComboBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  const filteredProjects =
    query === ""
      ? []
      : projects.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="bg-opacity-25 fixed inset-0 bg-gray-500 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="ring-opacity-5 mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black transition-all">
              <Combobox>
                {/* <Combobox onChange={(item) => (window.location = item.url)}> */}
                {/* Search Bar */}
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pr-4 pl-11 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {/* All Options */}
                {(query === "" || filteredProjects.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto">
                    <li className="p-2">
                      {query === "" && (
                        <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-500">
                          Recent searches
                        </h2>
                      )}
                      {/* Recent Searches, or filtered results */}
                      <ul className="text-sm text-gray-700">
                        {(query === "" ? recent : filteredProjects).map(
                          (project) => (
                            <Combobox.Option
                              key={project.id}
                              value={project}
                              className={({ active }) =>
                                clsx(
                                  "flex cursor-default items-center rounded-md px-3 py-2 select-none",
                                  active && "bg-indigo-600 text-white",
                                )
                              }>
                              {({ active }) => (
                                <>
                                  <FolderIcon
                                    className={clsx(
                                      "h-6 w-6 flex-none",
                                      active ? "text-white" : "text-gray-400",
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {project.name}
                                  </span>
                                  {active && (
                                    <span
                                      className="ml-3 flex-none text-indigo-100"
                                      onClick={() => {}}>
                                      Jump to...
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ),
                        )}
                      </ul>
                    </li>

                    {/* Quick Actions */}
                    {/* isPersistent = boolean */}
                    {/* 
                    quickActions = {
                      list = {
                        name: string,
                        icon: React.ReactNode
                        isPersistent: boolean,
                      }[],
                    }
                  */}
                    {/* Quick Actions */}
                    {/* {query === "" && (
                      <li className="p-2">
                        <h2 className="sr-only">Quick actions</h2>
                        <ul className="text-sm text-gray-700">
                          {quickActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                clsx(
                                  "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                  active && "bg-indigo-600 text-white",
                                )
                              }>
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={clsx(
                                      "h-6 w-6 flex-none",
                                      active ? "text-white" : "text-gray-400",
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {action.name}
                                  </span>
                                  <span
                                    className={clsx(
                                      "ml-3 flex-none text-xs font-semibold",
                                      active
                                        ? "text-indigo-100"
                                        : "text-gray-400",
                                    )}>
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">
                                      {action.shortcut}
                                    </kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )} */}
                  </Combobox.Options>
                )}

                {/* No results found */}
                {query !== "" && filteredProjects.length === 0 && (
                  <div className="px-6 py-14 text-center sm:px-14">
                    <FolderIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      We couldn't find any projects with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
