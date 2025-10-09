import React from "react";
import { Link } from "react-router-dom";
import { PAGE_ROUTE_URLS } from "../utils/constant";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 sm:py-22 lg:px-8 transition-colors min-h-full">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          Welcome to MyApp
        </h1>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
          Explore our amazing products, services, and features. Enjoy a smooth
          experience with light and dark mode support.
        </p>
        <Link
          to={PAGE_ROUTE_URLS.PRODUCT_LIST}
          className="mt-8 inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-md transition-colors"
        >
          Browse Products
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {[
          {
            title: "Fast Delivery",
            description: "Get your products quickly and reliably.",
          },
          {
            title: "High Quality",
            description: "We ensure top-notch quality for all items.",
          },
          {
            title: "24/7 Support",
            description: "Our team is available anytime you need help.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
