/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

export function useIdle(timeout) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    setIsIdle(false);
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
    };
  }, []);

  return isIdle;
}
