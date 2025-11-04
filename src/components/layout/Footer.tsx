import React from "react";
import { getNewDate } from "../../utils/helper";
import Text from "../common/Text";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-inner transition-colors">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <Text size="sm">
          &copy; {getNewDate().getFullYear()} MyApp. All rights reserved.
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
