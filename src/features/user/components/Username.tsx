import { useUser } from "../api/tanstack/useUser";

import { formatUsername } from "../utils/formatUsername";

export const Username = () => {
  const { data, isSuccess } = useUser();

  if (!isSuccess) return null;

  return <div>{formatUsername(data.first_name, data.last_name)}</div>;
};
