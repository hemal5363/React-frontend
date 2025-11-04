import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
