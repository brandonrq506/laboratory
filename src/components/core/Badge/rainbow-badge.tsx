interface Props {
  children: React.ReactNode;
}

export const RainbowBadge = ({ children }: Props) => {
  return (
    <span className="rainbow-border inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
      {children}
    </span>
  );
};
