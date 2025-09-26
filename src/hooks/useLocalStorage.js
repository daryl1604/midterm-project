import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (e) {
      console.error("useLocalStorage read error", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (state === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (e) {
      console.error("useLocalStorage write error", e);
    }
  }, [key, state]);

  return [state, setState];
}
