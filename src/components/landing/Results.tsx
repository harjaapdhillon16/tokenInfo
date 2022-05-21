import React from "react";

import { ApiCard } from "../apiCard";

type Props = {
  data: {
    title: string;
    isImageNew: boolean;
    image: string;
  }[];
  searchTerm: string;
};

export const Results = ({ data, searchTerm }: Props) => {
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {filteredData.map((item, idx) => (
        <ApiCard key={idx} {...item} />
      ))}
    </>
  );
};
