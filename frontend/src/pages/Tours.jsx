import React from "react";
import CommonHeader from "../components/global/CommonHeader";
import { styles } from "../styles/styles";
import List from "../components/Tours/List";

const Tours = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className={`w-full overflow-hidden ${styles.horizontalPadding}`}>
        <div className="w-full flex items-center justify-center mt-4">
          <h2 className={`${styles.headingSize}`}>Đà Nẵng, Ngày 6/9/2024</h2>
        </div>
        <List />
      </div>
    </div>
  );
};

export default Tours;
