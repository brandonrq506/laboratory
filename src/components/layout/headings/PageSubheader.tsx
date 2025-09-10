interface Props {
  className?: string;
  text: string;
}

export const PageSubheader = ({ className, text }: Props) => {
  return (
    <div className={className}>
      <h2 className="font-base text-gray-500">{text}</h2>
    </div>
  );
};
