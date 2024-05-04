import { useOnlineStatus } from "@/hooks";

export const Projects = () => {
  const isOnline = useOnlineStatus();
  const online = isOnline ? "Online" : "Offline";

  return <div>{online}</div>;
};
