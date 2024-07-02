interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ children, className }: IProps) => {
  return (
    <div className={`font-semibold text-[28px] leading-[38px] ${className}`}>
      {children}
    </div>
  );
};