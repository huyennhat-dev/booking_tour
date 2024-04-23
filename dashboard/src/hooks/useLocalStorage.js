import { useState } from 'react';


const useLocalStorage = (key, initialValue) => {
    // Tạo state đầu tiên từ localStorage, nếu không có thì sử dụng initialValue
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    // Hàm để cập nhật giá trị mới và lưu vào localStorage
    const setValue = (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Lưu giá trị vào localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Cập nhật state
        setStoredValue(valueToStore);
      } catch (error) {
        console.error(error);
      }
    };
  
    return [storedValue, setValue];
  };
  
  export default useLocalStorage;