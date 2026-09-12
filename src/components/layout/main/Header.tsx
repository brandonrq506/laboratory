type HeaderProps = { children?: React.ReactNode };

export const Header = ({ children }: HeaderProps) => {
  return (
    <div className="bg-surface pt-safe-4 sticky top-0 z-10 flex items-center gap-x-6 px-4 pb-4 shadow-xs sm:px-6 lg:hidden">
      {children}
    </div>
  );
};
