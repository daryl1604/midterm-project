// src/components/SearchBar.jsx
import { FaSearch } from "react-icons/fa"; // install react-icons if not already

function SearchBar({ value, onChange }) {
  const placeholder = "Search by name or location...";

  return (
    <div className="input-group shadow-sm">
      <span
        className="input-group-text border-0"
        style={{ backgroundColor: "#e0f2f1", color: "#004d40" }}
      >
        <FaSearch />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-control border-0"
        style={{
          backgroundColor: "#e0f2f1",
          color: "#004d40",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}

export default SearchBar;
