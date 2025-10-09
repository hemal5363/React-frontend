import React from "react";
import { Link } from "react-router-dom";
import { PAGE_ROUTE_URLS } from "../utils/constant";

const PageNotFound: React.FC = () => {
  return (
    <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8 transition-colors">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-500 dark:text-indigo-400">
          404
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-300 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={PAGE_ROUTE_URLS.HOME}
            className="rounded-md bg-indigo-500 dark:bg-indigo-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 dark:hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
