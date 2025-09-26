// src/pages/SpaceDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useSpaces } from "../contexts/SpacesContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useBookings } from "../contexts/BookingContext.jsx";
import { useMemo, useState } from "react";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const { spaces } = useSpaces();
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");

  const space = useMemo(
    () => spaces.find((s) => String(s.id) === String(spaceId)),
    [spaces, spaceId]
  );

  if (!space) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger text-center">Space not found.</div>
      </main>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (!slot || !date) return;
    addBooking({
      spaceId: space.id,
      spaceName: space.name,
      date,
      slot,
      price: space.price,
    });
    setSlot("");
    setDate("");
    alert("✅ Booking confirmed!");
  };

  return (
    <main className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {space.name}
          </li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Image Section */}
        <div className="col-lg-6">
          <img
            src={space.main_image}
            alt={space.name}
            className="img-fluid rounded shadow-sm mb-3"
            style={{ maxHeight: 420, objectFit: "cover", width: "100%" }}
          />
          {space.images?.length > 0 && (
            <div className="d-flex gap-2 mt-2">
              {space.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${space.name} ${idx + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: "100px", height: "70px", objectFit: "cover" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3 text-teal">{space.name}</h2>
          <p className="mb-2">
            <strong>📍 Location:</strong> {space.location}
          </p>
          <p className="mb-2">
            <strong>🕒 Hours:</strong> {space.hours}
          </p>
          <p className="fs-4 fw-bold text-success">
            ₱{space.price.toLocaleString()}
          </p>
          <p>{space.description}</p>

          <h5 className="mt-4">Amenities</h5>
          <div className="row row-cols-2 g-2">
            {space.amenities.map((a, i) => (
              <div key={i} className="col">
                <span className="badge bg-light text-dark p-2 shadow-sm w-100">
                  ✅ {a}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="card shadow-sm mt-5">
        <div className="card-header text-white" style={{ backgroundColor: "teal" }}>
          <h5 className="mb-0">Book a Time Slot</h5>
        </div>
        <div className="card-body">
          {user ? (
            <form onSubmit={submit} className="row g-3 mx-auto" style={{ maxWidth: 500 }}>
              <div className="col-12">
                <label className="form-label fw-bold">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Time Slot</label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select a slot</option>
                  {space.time_slots.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 d-grid">
                <button type="submit" className="btn btn-success">
                  Confirm Booking
                </button>
              </div>
            </form>
          ) : (
            <div className="alert alert-warning text-center">
              ⚠️ You must log in to book a slot.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
