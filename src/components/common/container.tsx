import React from "react";
import { Helmet } from "react-helmet";

import { Navbar } from "./navbar";

interface Props {
  pageTitle: string;
  children: JSX.Element;
}

export const Container = ({ pageTitle, children }: Props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
      </Helmet>
      <div className="min-h-screen bg-black">
        <Navbar />
        {children}
      </div>
    </>
  );
};
