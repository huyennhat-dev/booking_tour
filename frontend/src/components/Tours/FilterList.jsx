import React from "react";
import { styles } from "../../styles/styles";
import InputCheckbox from "../global/InputCheckbox";

const FilterList = () => {
  return (
    <div className="w-full rounded-xl border mt-4 h-auto max-h-[27rem]">
      <div
        className={`${styles.bgOrange} rounded-t-xl px-6 py-8 flex flex-col justify-center items-start gap-4`}
      >
        <p className="text-sm font-normal text-white">
          When are you traveling?
        </p>
        <select
          name=""
          id=""
          className="rounded-lg text-sm outline-none py-3 px-4 w-4/5"
        >
          <option value="Feb 5 - Mar 14">Feb 5 - Mar 14</option>
          <option value="Feb 5 - Mar 14">Feb 5 - Mar 14</option>
          <option value="Feb 5 - Mar 14">Feb 5 - Mar 14</option>
          <option value="Feb 5 - Mar 14">Feb 5 - Mar 14</option>
        </select>
      </div>
      <div className="w-full pt-6 pb-6 md:pb-0 ps-6 flex flex-col justify-start items-start gap-3">
        <p className="font-medium text-base">Tour Type</p>
        <InputCheckbox labelName={"Nature Tours"} labelId={"nature-tours"} />
        <InputCheckbox
          labelName={"Adventure Tours"}
          labelId={"adventure-tours"}
        />
        <InputCheckbox
          labelName={"Cultural Tours"}
          labelId={"cultural-tours"}
        />
        <InputCheckbox labelName={"Food Tours"} labelId={"food-tours"} />
        <InputCheckbox labelName={"City Tours"} labelId={"city-tours"} />
        <InputCheckbox labelName={"Cruises Tours"} labelId={"cruise-tours"} />
      </div>
    </div>
  );
};

export default FilterList;
