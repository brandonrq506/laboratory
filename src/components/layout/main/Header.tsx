type HeaderProps = { children?: React.ReactNode };

export const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      {children}
    </div>
  );
};
