interface Props {
  count: number;
}

export const TaskCountLabel = ({ count }: Props) => <p>{count} tasks</p>;
