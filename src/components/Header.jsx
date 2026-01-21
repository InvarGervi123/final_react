// HEADER.JSX
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const [query] = useSearchParams();
  const [term, setTerm] = useState(query.get("s") || "black");

  useEffect(() => {
    setTerm(query.get("s") || "black");
  }, [query]);

  const onSub = (e) => {
    e.preventDefault();
    if (term === "") return;
    nav("/?s=" + term);
  };

  const showHome = window.location.pathname === "/";

  return (
    <>
      <header className="topHeader container-fluid">
        <div className="container py-2">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="m-0">
              <Link to="/" className="brandLink">My Vod</Link>
            </h3>
          </div>
        </div>
      </header>

      {showHome && (
        <div className="bannerWrap">
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="bannerText">Monkeys V.O.D</div>
          </div>
        </div>
      )}
    </>
  );
}
