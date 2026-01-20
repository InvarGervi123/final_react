import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function HomeInfo() {
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
    const s =
      (query.get("s") || "").trim() ||
      (localStorage.getItem("lastSearch") || "black").trim();

    nav(`/?s=${encodeURIComponent(s)}`);
  };

  return (
    <div className="container text-center mt-4">
      {loading && <h2>Loading...</h2>}
      {err && !loading && <div className="alert alert-warning">{err}</div>}

      {!loading && !err && info && (
        <>
          {info.Poster !== "N/A" && (
            <img className="infoPoster" src={info.Poster} alt={info.Title} />
          )}

          <h1 className="infoTitle mt-3">{info.Title}</h1>

          <div>Runtime: {info.Runtime}</div>
          <div>Rating: {info.imdbRating}</div>
          <div>Genere: {info.Genre}</div>

          <div className="infoPlot mt-2">Plot: {info.Plot}</div>

          <button onClick={onBack} className="btn btn-dark mt-3">
            Back to list
          </button>
        </>
      )}
    </div>
  );
}
