import { formatDatetimeTo12hTime } from "@/utils";

interface Props {
  date: Date;
}

export const StartTimeLabel = ({ date }: Props) => (
  <p className="tabular-nums">{formatDatetimeTo12hTime(date)}</p>
);
