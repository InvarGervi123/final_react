import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function MovieInfoPage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const params = useParams();
  const nav = useNavigate();
  const [query] = useSearchParams();

  useEffect(() => {
    doApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doApi = async () => {
    const id = params.id;

    const url1 = `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=5a292f28`;
    const url2 = `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=90781f94`;

    setErr("");
    setLoading(true);

    try {
      let { data } = await axios.get(url1);
      if (!data || data.Response === "False") {
        ({ data } = await axios.get(url2));
      }

      if (!data || data.Response === "False") {
        setErr(data?.Error || "Not found");
        setLoading(false);
        return;
      }

      setInfo(data);
      setLoading(false);
    } catch (e) {
      setErr("API error");
      setLoading(false);
    }
  };

  const onBack = () => {
    const s = (query.get("s") || "").trim();
    if (s) nav(`/?s=${encodeURIComponent(s)}`);
    else nav(-1);
  };

  return (
    <div className="container text-center mt-3">
      {loading && <h2>Loading...</h2>}
      {err && !loading && <div className="alert alert-warning">{err}</div>}

      {!loading && !err && info && (
        <>
          <h1 className="mb-3">{info.Title}</h1>

          {info.Poster !== "N/A" && (
            <img src={info.Poster} alt={info.Title} className="img-fluid mb-3" style={{ maxHeight: 500 }} />
          )}

          <div><b>Actors:</b> {info.Actors}</div>
          <div><b>IMDB Rating:</b> {info.imdbRating}</div>
          <div><b>Runtime:</b> {info.Runtime}</div>

          <p className="mt-3" style={{ maxWidth: 800, margin: "0 auto" }}>
            {info.Plot}
          </p>

          <button onClick={onBack} className="btn btn-secondary mt-3">
            Back
          </button>
        </>
      )}
    </div>
  );
}
