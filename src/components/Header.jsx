import React, { useRef } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const nav = useNavigate();
  const [query] = useSearchParams();
  const inputRef = useRef();

  const onSub = (e) => {
    e.preventDefault();
    const val = (inputRef.current?.value || "").trim();
    if (!val) return;
    nav(`/?s=${encodeURIComponent(val)}`);
  };

  const showSearch = location.pathname === "/";

  return (
    <header className="container-fluid" style={{ background: "orange" }}>
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <h3 className="m-0">VOD</h3>
          </div>

          <nav className="col-auto">
            <ul className="list-inline d-sm-flex align-items-center h-100 m-0">
              <li className="me-3">
                <Link to="/">Movies</Link>
              </li>
            </ul>
          </nav>

          {showSearch && (
            <form onSubmit={onSub} className="col-12 col-md-5 ms-md-auto mt-2 mt-md-0">
              <div className="d-flex">
                <input
                  ref={inputRef}
                  defaultValue={query.get("s") || "black"}
                  className="form-control"
                  placeholder="Search movie..."
                  type="search"
                />
                <button className="btn btn-dark ms-2">Search</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
