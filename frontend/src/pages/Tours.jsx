import React from "react";
import CommonHeader from "../components/global/CommonHeader";
import { styles } from "../styles/styles";
import FilterList from "../components/Tours/FilterList";
import List from "../components/Tours/List";

const Tours = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <CommonHeader />
      <div
        className={`w-full overflow-hidden grid grid-cols-1 md:grid-cols-4 ${styles.horizontalPadding}`}
      >
        <FilterList />
        <List />
      </div>
    </div>
  );
};

export default Tours;
