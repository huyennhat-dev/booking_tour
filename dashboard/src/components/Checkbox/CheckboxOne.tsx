import { useEffect, useState } from 'react';

const CheckboxOne = (
  { title, id, onCheckboxChange, defaultVal }:
    {
      title: string; id: string;
      onCheckboxChange: (isChecked: boolean, id: string) => void;
      defaultVal?: boolean
    }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    onCheckboxChange(newCheckedValue, id);
  };
  
  useEffect(() => {
    if (defaultVal !== undefined) setIsChecked(defaultVal);
  }, [defaultVal]);




  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${isChecked && 'border-primary bg-gray dark:bg-transparent'
              }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
        {title}
      </label>
    </div>
  );
};

export default CheckboxOne;
