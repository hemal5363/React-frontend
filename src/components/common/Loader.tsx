import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center z-50 my-8">
      <div className="relative w-16 h-16">
        <div className="absolute inline-flex w-full h-full rounded-full bg-indigo-500 opacity-75 animate-ping"></div>
        <div className="absolute inline-flex w-full h-full rounded-full border-4 border-indigo-500 opacity-100"></div>
      </div>
    </div>
  );
};

export default Loader;
