import React from "react";

const Button = ({
  children,
  onClickButton,
  className,
}: {
  children: React.ReactNode;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  className?: any;
}) => {
  return (
    <button
      {...className}
      className="bg-brand elevation-next px-3 py-1 rounded-lg pointer w-max"
      onClick={onClickButton}
    >
      {children}
    </button>
  );
};

export default Button;
