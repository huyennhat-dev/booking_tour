import { useEffect, useState } from 'react';

const useDaysDifference = (startDate, endDate) => {
  const [differenceInDays, setDifferenceInDays] = useState(null);

  useEffect(() => {
    const convertToDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const departureDate = convertToDate(startDate);
    const arrivalDate = convertToDate(endDate);

    // Tính số miligiây giữa hai ngày
    const differenceInTime = arrivalDate.getTime() - departureDate.getTime();

    // Chuyển đổi miligiây thành số ngày và làm tròn xuống
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    // Lưu số ngày vào state
    setDifferenceInDays(differenceInDays);
  }, [startDate, endDate]);

  return differenceInDays;
};

export default useDaysDifference;
