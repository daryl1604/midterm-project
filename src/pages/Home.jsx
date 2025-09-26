// src/pages/Home.jsx  
import { useSpaces } from "../contexts/SpacesContext.jsx";
import SpaceCard from "../components/SpaceCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useState, useMemo } from "react";

export default function Home() {
  const { spaces, loading, error } = useSpaces();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return spaces.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
    );
  }, [spaces, query]);

  return (
    <main
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#f8fafc", overflowX: "hidden" }}
    >
      {/* Hero Section */}
      <header
        className="text-center position-relative"
        style={{
          backgroundImage:
            "url('https://julianawang.com/wp-content/uploads/2019/04/student-hub-support-services.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <div
          className="py-5"
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // dark overlay so text shows
          }}
        >
          <div className="container">
            <h1
              className="fw-bold display-4"
              style={{ textShadow: "0 3px 8px rgba(0, 0, 0, 0.6)" }}
            >
              Discover Study Spaces
            </h1>
            <p
              className="lead mb-0"
              style={{ textShadow: "0 2px 5px rgba(0, 0, 0, 0.5)" }}
            >
              Find the perfect spot to focus, collaborate, and create
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container flex-grow-1 py-5">
        <div className="mb-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status" />
            <p className="mt-2 text-muted">Loading spaces...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger shadow-sm" role="alert">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row g-4">
            {filtered.length > 0 ? (
              filtered.map((space) => (
                <div
                  key={space.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="h-100">
                    <SpaceCard space={space} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-info text-center shadow-sm">
                  No spaces found.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className="text-white text-center py-3 mt-auto"
        style={{ backgroundColor: "#00695c" }}
      >
        <small>© 2025 StudySpot PH. All rights reserved.</small>
      </footer>
    </main>
  );
}
