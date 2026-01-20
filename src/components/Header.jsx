import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="topHeader container-fluid">
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="col-auto">
            <h3 className="m-0">
              <Link to="/" className="brandLink">My Vod</Link>
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
