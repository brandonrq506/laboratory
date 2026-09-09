import { ListBulletIcon } from "@heroicons/react/24/solid";

const defaultIcon = (
  <ListBulletIcon
    role="img"
    aria-hidden
    className="text-foreground-faint mx-auto size-12 stroke-1"
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
      <h3 className="text-foreground mt-2 text-sm font-semibold">{title}</h3>
      <p className="text-foreground-subtle mt-1 text-sm">{description}</p>
    </div>
  );
};
