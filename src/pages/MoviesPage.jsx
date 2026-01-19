import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [query] = useSearchParams();

  useEffect(() => {
    doApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const doApi = async () => {
    const s = (query.get("s") || "black").trim();

    const url1 = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=5a292f28`;
    const url2 = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=90781f94`;

    setErr("");
    setLoading(true);
    setList([]);

    try {
      let { data } = await axios.get(url1);
      if (!data || data.Response === "False") {
        // fallback
        ({ data } = await axios.get(url2));
      }

      if (!data || data.Response === "False") {
        setErr(data?.Error || "No results");
        setLoading(false);
        return;
      }

      setList(Array.isArray(data.Search) ? data.Search : []);
      setLoading(false);
    } catch (e) {
      setErr("API error");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      {loading && <h4>Loading...</h4>}
      {err && !loading && <div className="alert alert-warning">{err}</div>}

      <div className="row">
        {list.map((item) => (
          <div className="col-md-6 col-lg-4 p-3" key={item.imdbID}>
            <div className="border p-2 shadow-sm h-100">
              {item.Poster !== "N/A" && (
                <img
                  src={item.Poster}
                  alt={item.Title}
                  className="img-fluid mb-2"
                  style={{ maxHeight: 320, objectFit: "cover", width: "100%" }}
                />
              )}
              <h5 className="mb-1">{item.Title}</h5>
              <div className="text-muted">{item.Year}</div>

              <Link
                to={`/info/${item.imdbID}?s=${encodeURIComponent(query.get("s") || "black")}`}
                className="btn btn-dark mt-2"
              >
                MORE INFO
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
