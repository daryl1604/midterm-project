// src/contexts/BookingContext.jsx
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { useAuth } from "./AuthContext.jsx";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("ssp_bookings", []);
  const { user } = useAuth();

  const addBooking = (booking) => {
    if (!user) {
      alert("You must log in first to book.");
      return;
    }

    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();

    setBookings((prev) => [
      ...prev,
      { id, ...booking, bookedBy: user.fullName },
    ]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const hasBookings = bookings.length > 0;

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, hasBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}