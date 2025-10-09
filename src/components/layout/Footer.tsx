import React from "react";
import { getNewDate } from "../../utils/helper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-inner transition-colors">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {getNewDate().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
