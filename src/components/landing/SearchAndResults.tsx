import React from "react";

import { SearchBar } from "./SearchBar";
import { Results } from "./Results";
import { Data } from "../../constants/data";
import { useState } from "react";

export const SearchAndResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="mt-10">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="p-10">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 text-left">
          <Results searchTerm={searchTerm} data={Data} />
        </div>
      </div>
    </div>
  );
};
