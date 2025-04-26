import { useUser } from "../api/tanstack/useUser";

interface Props {
  children: React.ReactNode;
}

export const AdminProtectedContent = ({ children }: Props) => {
  const { data } = useUser();

  if (data?.is_admin) {
    return <>{children}</>;
  }

  return null;
};
