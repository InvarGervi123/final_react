import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [query] = useSearchParams();
  const nav = useNavigate();

  const [term, setTerm] = useState(query.get("s") || "black");

  useEffect(() => {
    const s = (query.get("s") || "black").trim();
    setTerm(s);
    localStorage.setItem("lastSearch", s);
    doApi(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onSub = (e) => {
    e.preventDefault();
    const s = term.trim();
    if (!s) return;
    localStorage.setItem("lastSearch", s);
    nav(`/?s=${encodeURIComponent(s)}`);
  };

  const doApi = async (s) => {
    const url1 = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=5a292f28`;
    const url2 = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=90781f94`;

    setErr("");
    setLoading(true);
    setList([]);

    try {
      let { data } = await axios.get(url1);
      if (!data || data.Response === "False") {
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
    <div className="pageBg">
      <div className="topBanner" style={{ background: `url(${process.env.PUBLIC_URL}/images/vod_banner.jpg) center/cover no-repeat`,}}>
        <div className="bannerText">Monkeys V.O.D</div>
    </div>


      <div className="container py-3">
        <form onSubmit={onSub} className="col-12 col-md-5">
          <div className="input-group searchGroup">
            <input
              type="search"
              className="form-control"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="btn btn-warning searchBtn">Search</button>
          </div>
        </form>

        <h2 className="listTitle mt-3">List of tv shows:</h2>

        {loading && <h4>Loading...</h4>}
        {err && !loading && <div className="alert alert-warning">{err}</div>}

        <div className="row">
          {list.map((item) => (
            <div className="col-12 col-md-6 col-lg-4 p-3" key={item.imdbID}>
              <div className="movieCard d-flex">
                {item.Poster !== "N/A" && (
                  <img className="movieThumb" src={item.Poster} alt={item.Title} />
                )}

                <div className="ms-3 flex-grow-1">
                  <h4 className="movieTitle">{item.Title}</h4>
                  <div className="movieYear">Year: {item.Year}</div>

                  <Link
                    to={`/info/${item.imdbID}?s=${encodeURIComponent(term.trim() || "black")}`}
                    className="btn btn-dark mt-2"
                  >
                    More info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
