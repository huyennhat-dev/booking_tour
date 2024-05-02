import React from "react";

const InputCheckbox = ({ labelName, labelId }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={labelId}
        id={labelId}
        className="w-3 h-3 accent-[#EB662B]"
      />
      <label htmlFor={labelId} className="text-sm font-normal">
        {labelName}
      </label>
    </div>
  );
};

export default InputCheckbox;
