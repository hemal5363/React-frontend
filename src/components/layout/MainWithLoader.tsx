import React from "react";

import FullScreenLoader from "../common/FullScreenLoader";

interface MainWithLoaderProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const MainWithLoader: React.FC<MainWithLoaderProps> = ({
  children,
  isLoading,
  className,
}) => {
  return isLoading ? (
    <FullScreenLoader />
  ) : (
    <div className={`container mx-auto px-4 py-6 sm:px-6 sm:py-12 ${className}`}>{children}</div>
  );
};

export default MainWithLoader;
