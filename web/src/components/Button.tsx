interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
}

export default function Button({
  children,
  className,
  onClick,
  onSubmit,
  type,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      className={`flex items-center p-1 sm:p-3 text-center gap-2 rounded-lg hover:brightness-75 transition-all h-fit ${className}`}
    >
      {children}
    </button>
  );
}
