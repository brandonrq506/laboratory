export type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};
