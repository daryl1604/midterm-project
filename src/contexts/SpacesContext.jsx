// src/contexts/SpacesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const SpacesContext = createContext();

export function SpacesProvider({ children }) {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSpaces() {
      try {
        const res = await fetch("/spaces.json"); // fetch from public/
        if (!res.ok) {
          throw new Error(`Failed to fetch spaces.json: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("spaces.json did not return an array");
        }

        setSpaces(data);
      } catch (err) {
        console.error("Error loading spaces:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadSpaces();
  }, []);

  return (
    <SpacesContext.Provider value={{ spaces, loading, error }}>
      {children}
    </SpacesContext.Provider>
  );
}

export function useSpaces() {
  return useContext(SpacesContext);
}
