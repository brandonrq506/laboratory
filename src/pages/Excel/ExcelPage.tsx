import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { PageHeader } from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TextArea } from "@/components/form";
import { useCreateExcel } from "@/features/excel/api";

type FormData = {
  activities: string;
};

export const ExcelPage = () => {
  const { data, mutate, isSuccess } = useCreateExcel();
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: { activities: "" },
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("activities", data.activities);
    mutate(formData);
  };

  return (
    <div>
      <PageHeader title="Excel Ingest" />

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 text-center">
        <TextArea
          label="Activities"
          registration={register("activities", {
            required: "This field is required",
          })}
        />

        <p className="mt-1 text-sm text-gray-500">
          Please copy and paste your data in format Activity - Time
        </p>
        <div className="mt-6">
          <Button
            type="submit"
            startIcon={<PlusIcon aria-hidden className="size-5" />}>
            Transform Data
          </Button>
        </div>
      </form>

      {isSuccess && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Activity
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Base Activity
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        % of day
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((person) => (
                      <tr key={person.start_time}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.activity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.activity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.start_time}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.duration}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date().toISOString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.percent_of_day}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
