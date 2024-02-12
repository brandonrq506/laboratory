import { EnvelopeIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";

export const Projects = () => {
  return (
    <div className="flex h-screen flex-col rounded-lg border bg-gray-200 text-center">
      Input Variants
      <div className="w-1/3">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
            aria-describedby="email-description"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          We'll only use this for spam.
        </p>
      </div>
      <br />
      <div className="w-1/3">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
            defaultValue="adamwathan"
            aria-invalid="true"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Not a valid email address.
        </p>
      </div>
      <br />
      <div className="w-1/3">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <EnvelopeIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <br />
      <div className="w-1/3">
        <label
          htmlFor="comment"
          className="block text-sm font-medium leading-6 text-gray-900">
          Add your comment
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
            placeholder="Enter your notes here..."
          />
        </div>
      </div>
    </div>
  );
};
