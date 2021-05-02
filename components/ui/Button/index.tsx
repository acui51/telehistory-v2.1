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
  const classes = `${className} elevation-next px-3 py-1 rounded-lg pointer w-max transition duration-500 ease-in-out transform hover:scale-105`;
  return (
    <button className={classes} onClick={onClickButton}>
      {children}
    </button>
  );
};

export default Button;
