// src/pages/DashboardPage.jsx
import { useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../components/Modal";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaTimes,
  FaEye,
} from "react-icons/fa";
import spaces from "../../public/spaces.json"; // load spaces.json

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const [pendingCancel, setPendingCancel] = useState(null);
  const [viewBooking, setViewBooking] = useState(null);

  const title = "My Bookings";
  const confirmTitle = "Cancel Booking";
  const confirmMessage = "Are you sure you want to cancel this booking?";

  const onConfirm = () => {
    if (pendingCancel) cancelBooking(pendingCancel);
    setPendingCancel(null);
  };

  const onCancel = () => setPendingCancel(null);

  // helper: find the space details for a booking
  const getSpace = (spaceName) =>
    spaces.find((s) => s.name === spaceName) || {};

  return (
    <main className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: "teal" }}>
          {title}
        </h2>
      </div>

      {!user ? (
        <div className="alert alert-warning text-center shadow-sm">
          You must log in first to view your bookings.
        </div>
      ) : bookings.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          No bookings yet. Start by reserving a study space!
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((b) => {
            const space = getSpace(b.spaceName);
            return (
              <div className="col-md-6 col-lg-4" key={b.id}>
                <div className="card shadow h-100 border-0">
                  {/* Space image */}
                  {space.main_image && (
                    <img
                      src={space.main_image}
                      alt={b.spaceName}
                      className="card-img-top"
                      style={{
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "teal" }}
                  >
                    <h5 className="mb-0">{b.spaceName}</h5>
                  </div>

                  <div className="card-body">
                    <p className="mb-2">
                      <FaCalendarAlt className="me-2 text-teal" />
                      <strong>Date:</strong> {b.date}
                    </p>
                    <p className="mb-2">
                      <FaClock className="me-2 text-teal" />
                      <strong>Slot:</strong> {b.slot}
                    </p>
                    <p className="mb-2">
                      <FaMoneyBillWave className="me-2 text-teal" />
                      <strong>Price:</strong> ₱{b.price}
                    </p>
                    <p className="mb-0">
                      <FaUser className="me-2 text-teal" />
                      <strong>Booked By:</strong> {b.bookedBy || user.fullName}
                    </p>
                  </div>

                  <div className="card-footer bg-light d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setViewBooking(b)}
                    >
                      <FaEye className="me-1" /> View Details
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setPendingCancel(b.id)}
                    >
                      <FaTimes className="me-1" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel confirmation modal */}
      <Modal isOpen={Boolean(pendingCancel)} onClose={onCancel}>
        <h4 className="mb-3">{confirmTitle}</h4>
        <p>{confirmMessage}</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onCancel}>
            Close
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Cancel
          </button>
        </div>
      </Modal>

      {/* View details modal */}
      {viewBooking && (
        <Modal isOpen={true} onClose={() => setViewBooking(null)}>
          {(() => {
            const space = getSpace(viewBooking.spaceName);
            return (
              <div>
                {/* Title */}
                <h4 className="fw-bold mb-3" style={{ color: "teal" }}>
                  Booking Details - {space.name}
                </h4>

                {/* Image */}
                {space.main_image && (
                  <img
                    src={space.main_image}
                    alt={space.name}
                    className="img-fluid rounded shadow-sm mb-3"
                    style={{ maxHeight: "220px", objectFit: "cover" }}
                  />
                )}

                {/* Booking info */}
                <div className="mb-3">
                  <p className="mb-2">
                    <FaCalendarAlt className="me-2 text-teal" />
                    <strong>Date:</strong> {viewBooking.date}
                  </p>
                  <p className="mb-2">
                    <FaClock className="me-2 text-teal" />
                    <strong>Slot:</strong> {viewBooking.slot}
                  </p>
                  <p className="mb-2">
                    <FaMoneyBillWave className="me-2 text-teal" />
                    <strong>Price:</strong> ₱{viewBooking.price}
                  </p>
                  <p className="mb-0">
                    <FaUser className="me-2 text-teal" />
                    <strong>Booked By:</strong>{" "}
                    {viewBooking.bookedBy || user.fullName}
                  </p>
                </div>

                {/* About */}
                {space.description && (
                  <div className="mb-3">
                    <h6 className="fw-bold">About</h6>
                    <p className="text-muted">{space.description}</p>
                  </div>
                )}

                {/* Amenities */}
                {space.amenities?.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold">Amenities</h6>
                    <ul className="list-unstyled row row-cols-2 g-2">
                      {space.amenities.map((a, i) => (
                        <li key={i} className="col">
                          <span className="badge bg-light text-dark shadow-sm w-100">
                            ✅ {a}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Close button */}
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setViewBooking(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </main>
  );
}
