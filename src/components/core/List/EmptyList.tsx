import { ListBulletIcon } from "@heroicons/react/24/solid";

const defaultIcon = (
  <ListBulletIcon
    role="img"
    aria-hidden
    className="mx-auto size-12 stroke-1 text-gray-400"
  />
);

interface Props {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

export const EmptyList = ({
  icon = defaultIcon,
  title = "No Items",
  description = "Get started by creating a new item.",
}: Props) => {
  return (
    <div className="rounded-md p-6 text-center font-light">
      {icon}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};
