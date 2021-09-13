import React from "react";

const Button = ({ children, className, onClick, type, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
