import React from "react";
import { PAGE_ROUTE_URLS } from "../utils/constant";
import MainWithLoader from "../components/layout/MainWithLoader";
import Text from "../components/common/Text";
import LinkButton from "../components/common/LinkButton";

const Home: React.FC = () => {
  return (
    <MainWithLoader>
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <Text variant="h1" size="lg" fontWeight="bold">
          Welcome to MyApp
        </Text>
        <Text size="lg" fontWeight="medium" className="mt-6">
          Explore our amazing products, services, and features. Enjoy a smooth
          experience with light and dark mode support.
        </Text>
        <LinkButton
          to={PAGE_ROUTE_URLS.PRODUCT_LIST}
          variant="primary"
          size="lg"
          className="mt-8"
        >
          Browse Products
        </LinkButton>
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
    </MainWithLoader>
  );
};

export default Home;
