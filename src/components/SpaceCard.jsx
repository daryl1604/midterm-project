// src/components/SpaceCard.jsx
import { Link } from "react-router-dom";

export default function SpaceCard({ space }) {
  return (
    <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
      {space.main_image && (
        <img
          src={space.main_image}
          alt={space.name}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}

      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h5
          className="fw-bold mb-2"
          style={{ color: "#009688" }} // teal title
        >
          {space.name}
        </h5>

        {/* Subtitle */}
        <p className="text-muted mb-4">{space.location}</p>

        {/* Button */}
        <div className="mt-auto">
          <Link
            to={`/space/${space.id}`}
            className="btn w-100 fw-semibold"
            style={{
              backgroundColor: "#009688", // teal
              color: "white",
              borderRadius: "6px",
              padding: "0.6rem",
            }}
          >
            Create Booking
          </Link>
        </div>
      </div>
    </div>
  );
}
