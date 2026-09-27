interface Props {
  name: string;
}

export const RoutineGroupName = ({ name }: Props) => (
  <p className="text-sm font-semibold">{name}</p>
);
