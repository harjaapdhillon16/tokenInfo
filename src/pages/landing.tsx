import React from "react";

import { Hero, SearchAndResults } from "../components/landing";
import { Container } from "../components/common/container";

export const LandingPage = () => {
  return (
    <Container pageTitle="Token Info">
      <div className="text-center">
        <Hero />
        <SearchAndResults />
      </div>
    </Container>
  );
};
