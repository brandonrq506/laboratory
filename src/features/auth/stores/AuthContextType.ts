export type AuthLossReason = "manual" | "refresh-failed";

export type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  login: (accessToken: string) => void;
  logout: (reason?: AuthLossReason) => void;
};
