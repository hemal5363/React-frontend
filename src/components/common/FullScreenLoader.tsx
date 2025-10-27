import React from "react";

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 opacity-50"></div>
      <div className="relative w-16 h-16">
        <div className="absolute inline-flex w-full h-full rounded-full bg-indigo-500 opacity-75 animate-ping"></div>
        <div className="absolute inline-flex w-full h-full rounded-full border-4 border-indigo-500 opacity-100"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
