type Props = {
  message?: string;
  description?: string;
  action?: React.ReactNode;
};

export const EmptyState = ({
  message = "No Records",
  description = "Get started by creating a new Record",
  action,
}: Props) => {
  return (
    <div className="py-10 text-center font-light">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="text-foreground-faint mx-auto size-12">
        <path
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="text-foreground mt-2 text-sm font-semibold">{message}</h3>
      <p className="text-foreground-subtle mt-1 text-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
