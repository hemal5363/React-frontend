import React from "react";

import LinkButton from "../components/common/LinkButton";
import Text from "../components/common/Text";
import MainWithLoader from "../components/layout/MainWithLoader";
import { PAGE_ROUTE_URLS } from "../utils/constant";

const PageNotFound: React.FC = () => {
  return (
    <MainWithLoader>
      <div className="text-center">
        <Text
          fontWeight="semibold"
          className="text-indigo-500 dark:text-indigo-400"
        >
          404
        </Text>
        <Text variant="h1" size="lg" fontWeight="semibold" className="mt-4">
          Page not found
        </Text>
        <Text size="lg" fontWeight="medium" className="mt-6">
          Sorry, we couldn’t find the page you’re looking for.
        </Text>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <LinkButton to={PAGE_ROUTE_URLS.HOME} variant="primary" size="md">
            Go back home
          </LinkButton>
        </div>
      </div>
    </MainWithLoader>
  );
};

export default PageNotFound;
