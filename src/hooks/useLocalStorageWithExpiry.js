import { useState } from "react";

export function useLocalStorageWithExpiry(initialValue, name, expiryMinutes) {
  const [value, setValue] = useState(getValue);

  function getValue() {
    const now = new Date().getTime();
    const item = localStorage.getItem(name);
    if (item) {
      const data = JSON.parse(item);
      if (data.expiryTime < now) {
        localStorage.removeItem(name);
      } else {
        return data.value;
      }
    }
    return initialValue;
  }

  const setLocalStorageValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(
      name,
      JSON.stringify({
        value: newValue,
        expiryTime:
          new Date().getTime() + parseFloat(expiryMinutes) * 60 * 1000,
      })
    );
  };

  return [value, setLocalStorageValue];
}
